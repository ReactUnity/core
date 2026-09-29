using System.Collections.Generic;
using ReactUnity.UGUI.Internal;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.RenderGraphModule;
using UnityEngine.Rendering.RendererUtils;
using UnityEngine.Rendering.Universal;

namespace ReactUnity.UGUI.URP
{
    /// <summary>
    /// The GrabPass URP does not have. The canvas's layer is taken out of the camera's culling mask and
    /// drawn by an injected pass instead, one render-queue slice at a time, with the colour target copied
    /// into the next reader's surface between slices.
    /// </summary>
    /// <remarks>
    /// Measured on the kitchen-sink HUD's readers at 2171x1295: about 0.03 ms of CPU and 0.03 ms of GPU
    /// per reader, against 1.5-2.5 ms for a camera render. Everything else on the layer is drawn too,
    /// after the scene's transparent objects rather than sorted among them.
    /// </remarks>
    public class UrpBackdropGrabber : IBackdropGrabber
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Register() => BackdropGrab.Grabber = new UrpBackdropGrabber();

        // Frames a job may go unrecorded before it is given up on -- a pipeline without render graph
        // never records, and the camera is not drawing the canvas meanwhile.
        const int StallFrames = 3;

        readonly Dictionary<Camera, Job> jobs = new Dictionary<Camera, Job>();
        readonly HashSet<Camera> stalled = new HashSet<Camera>();
        readonly List<Camera> dead = new List<Camera>();
        bool subscribed;

        class Job
        {
            public object Owner;
            public Camera Camera;
            public int Layer;
            public bool LayerWasDrawn;
            public IReadOnlyList<RenderTexture> Surfaces;
            public int Count;
            public readonly List<RTHandle> Handles = new List<RTHandle>();
            public readonly List<RenderTexture> Wrapped = new List<RenderTexture>();
            public readonly List<RenderTargetInfo> Infos = new List<RenderTargetInfo>();
            public CullingResults Cull;
            public int CulledFrame = -1;
            public int RecordedFrame;
            public SlicePass Pass;
        }

        public bool CanGrab(object owner, Camera cam)
        {
            if (!cam || stalled.Contains(cam) || !(GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset)) return false;
            if (CompatibilityMode) return false;
            return !jobs.TryGetValue(cam, out var job) || job.Owner == owner;
        }

        static bool CompatibilityMode
        {
            get
            {
#pragma warning disable CS0618
                return GraphicsSettings.TryGetRenderPipelineSettings<RenderGraphSettings>(out var settings) && settings.enableRenderCompatibilityMode;
#pragma warning restore CS0618
            }
        }

        public void Schedule(object owner, Camera cam, int layer, IReadOnlyList<RenderTexture> surfaces, int count)
        {
            if (!jobs.TryGetValue(cam, out var job))
            {
                job = new Job { Owner = owner, Camera = cam, Layer = -1, RecordedFrame = Time.frameCount };
                job.Pass = new SlicePass(job);
                jobs.Add(cam, job);
            }

            if (job.Layer != layer)
            {
                RestoreLayer(job);
                job.Layer = layer;
                job.LayerWasDrawn = (cam.cullingMask & (1 << layer)) != 0;
                cam.cullingMask &= ~(1 << layer);
            }

            job.Surfaces = surfaces;
            job.Count = count;
            SyncHandles(job);

            if (job.CulledFrame - job.RecordedFrame > StallFrames)
            {
                stalled.Add(cam);
                Cancel(owner, cam);
                return;
            }

            if (!subscribed)
            {
                RenderPipelineManager.beginCameraRendering += OnBeginCamera;
                subscribed = true;
            }
        }

        public void Cancel(object owner, Camera cam)
        {
            if (cam && jobs.TryGetValue(cam, out var job) && job.Owner == owner)
            {
                RestoreLayer(job);
                ReleaseHandles(job);
                jobs.Remove(cam);
            }

            // Nothing may keep a camera from drawing its canvas, so a job whose camera is gone goes too.
            dead.Clear();
            foreach (var pair in jobs) if (!pair.Key) dead.Add(pair.Key);
            for (int i = 0; i < dead.Count; i++)
            {
                ReleaseHandles(jobs[dead[i]]);
                jobs.Remove(dead[i]);
            }

            if (jobs.Count == 0 && subscribed)
            {
                RenderPipelineManager.beginCameraRendering -= OnBeginCamera;
                subscribed = false;
            }
        }

        static void RestoreLayer(Job job)
        {
            if (job.Layer < 0 || !job.Camera) return;
            if (job.LayerWasDrawn) job.Camera.cullingMask |= 1 << job.Layer;
            job.Layer = -1;
        }

        // The surfaces carry depth for the camera path, and render graph refuses to import a texture with
        // both formats, so each is wrapped by identifier with its colour format spelled out.
        static void SyncHandles(Job job)
        {
            for (int i = 0; i < job.Count; i++)
            {
                var rt = job.Surfaces[i];
                if (i < job.Handles.Count && job.Handles[i] != null && job.Wrapped[i] == rt) continue;
                if (i < job.Handles.Count) job.Handles[i]?.Release();
                else
                {
                    job.Handles.Add(null);
                    job.Wrapped.Add(null);
                    job.Infos.Add(default);
                }
                job.Handles[i] = RTHandles.Alloc(new RenderTargetIdentifier(rt));
                job.Wrapped[i] = rt;
                job.Infos[i] = new RenderTargetInfo { width = rt.width, height = rt.height, volumeDepth = 1, msaaSamples = 1, format = rt.graphicsFormat };
            }
        }

        static void ReleaseHandles(Job job)
        {
            for (int i = 0; i < job.Handles.Count; i++) job.Handles[i]?.Release();
            job.Handles.Clear();
            job.Wrapped.Clear();
            job.Infos.Clear();
        }

        void OnBeginCamera(ScriptableRenderContext context, Camera camera)
        {
            if (!jobs.TryGetValue(camera, out var job) || !job.LayerWasDrawn) return;
            if (!camera.TryGetCullingParameters(out var parameters)) return;

            parameters.cullingMask = 1u << job.Layer;
            parameters.shadowDistance = 0;
            job.Cull = context.Cull(ref parameters);
            job.CulledFrame = Time.frameCount;
            camera.GetUniversalAdditionalCameraData().scriptableRenderer.EnqueuePass(job.Pass);
        }

        class SlicePass : ScriptableRenderPass
        {
            static readonly ShaderTagId[] tags = { new ShaderTagId("SRPDefaultUnlit"), new ShaderTagId("UniversalForward"), new ShaderTagId("UniversalForwardOnly") };
            static readonly List<string> drawNames = new List<string>();
            static readonly List<string> copyNames = new List<string>();

            readonly Job job;

            class DrawData
            {
                public RendererListHandle List;
            }

            class CopyData
            {
                public TextureHandle Source, Target;
            }

            public SlicePass(Job job)
            {
                this.job = job;
                renderPassEvent = RenderPassEvent.AfterRenderingTransparents;
                // Only a texture can be read back mid-frame, which the backbuffer is not.
                requiresIntermediateTexture = true;
            }

            public override void RecordRenderGraph(RenderGraph renderGraph, ContextContainer frameData)
            {
                if (job.CulledFrame != Time.frameCount) return;
                job.RecordedFrame = Time.frameCount;

                var resources = frameData.Get<UniversalResourceData>();
                var camera = frameData.Get<UniversalCameraData>().camera;
                var color = resources.activeColorTexture;
                var depth = resources.activeDepthTexture;
                var first = BackdropSlice.BaseQueue;
                var last = first + job.Count;

                // Whatever else lives on the layer, around the slices it would have been sorted among.
                Draw(renderGraph, color, depth, camera, RenderQueueRange.opaque, SortingCriteria.CommonOpaque, "ReactUnity Layer Opaque");
                Draw(renderGraph, color, depth, camera, new RenderQueueRange(RenderQueueRange.transparent.lowerBound, first - 1), SortingCriteria.CommonTransparent, "ReactUnity Layer Below");

                for (int s = 0; s <= job.Count; s++)
                {
                    Draw(renderGraph, color, depth, camera, new RenderQueueRange(first + s, first + s), SortingCriteria.CommonTransparent, Name(drawNames, "ReactUnity Slice ", s));
                    if (s < job.Count && s < job.Handles.Count && job.Handles[s] != null)
                        Copy(renderGraph, color, renderGraph.ImportTexture(job.Handles[s], job.Infos[s]), Name(copyNames, "ReactUnity Backdrop Copy ", s));
                }

                Draw(renderGraph, color, depth, camera, new RenderQueueRange(last + 1, RenderQueueRange.transparent.upperBound), SortingCriteria.CommonTransparent, "ReactUnity Layer Above");
            }

            static string Name(List<string> names, string prefix, int i)
            {
                while (names.Count <= i) names.Add(prefix + names.Count);
                return names[i];
            }

            void Draw(RenderGraph renderGraph, TextureHandle color, TextureHandle depth, Camera camera, RenderQueueRange range, SortingCriteria sorting, string name)
            {
                if (range.lowerBound > range.upperBound) return;

                using var builder = renderGraph.AddRasterRenderPass<DrawData>(name, out var data);
                var desc = new RendererListDesc(tags, job.Cull, camera)
                {
                    renderQueueRange = range,
                    sortingCriteria = sorting,
                    layerMask = 1 << job.Layer,
                };
                data.List = renderGraph.CreateRendererList(desc);
                builder.UseRendererList(data.List);
                builder.SetRenderAttachment(color, 0);
                // Read so a camera-space canvas is still hidden behind whatever the scene put in front.
                if (depth.IsValid()) builder.SetRenderAttachmentDepth(depth, AccessFlags.Read);
                builder.SetRenderFunc((DrawData d, RasterGraphContext ctx) => ctx.cmd.DrawRendererList(d.List));
            }

            static void Copy(RenderGraph renderGraph, TextureHandle color, TextureHandle target, string name)
            {
                using var builder = renderGraph.AddUnsafePass<CopyData>(name, out var data);
                data.Source = color;
                data.Target = target;
                builder.UseTexture(color);
                builder.UseTexture(target, AccessFlags.Write);
                builder.AllowPassCulling(false);
                builder.SetRenderFunc((CopyData d, UnsafeGraphContext ctx) =>
                    CommandBufferHelpers.GetNativeCommandBuffer(ctx.cmd).Blit((RenderTargetIdentifier) d.Source, (RenderTargetIdentifier) d.Target));
            }
        }
    }
}
