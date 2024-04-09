using System;
#if (UNITY_WEBGL || UNITY_IOS) && !UNITY_EDITOR
using System.Collections.Generic;
#endif
using System.Runtime.InteropServices;

namespace Facebook.Yoga
{
    internal class YGNodeHandle : SafeHandle
    {
#if !(UNITY_WEBGL || UNITY_IOS) || UNITY_EDITOR
        private GCHandle _managedNodeHandle;
#else
        static Dictionary<IntPtr, YogaNode> contexts = new Dictionary<IntPtr, YogaNode>();
#endif

        private YGNodeHandle() : base(IntPtr.Zero, true)
        {
        }

        public override bool IsInvalid
        {
            get
            {
                return this.handle == IntPtr.Zero;
            }
        }

        protected override bool ReleaseHandle()
        {
            ReleaseManaged();
            if (!IsInvalid)
            {
                Native.YGNodeFree(this.handle);
                GC.KeepAlive(this);
            }
            return true;
        }

#if !(UNITY_WEBGL || UNITY_IOS) || UNITY_EDITOR
        public void SetContext(YogaNode node)
        {
            if (!_managedNodeHandle.IsAllocated)
            {
#if UNITY_5_4_OR_NEWER
                // Weak causes 'GCHandle value belongs to a different domain' error
                _managedNodeHandle = GCHandle.Alloc(node);
#else
                _managedNodeHandle = GCHandle.Alloc(node, GCHandleType.Weak);
#endif
                var managedNodePtr = GCHandle.ToIntPtr(_managedNodeHandle);
                Native.YGNodeSetContext(this.handle, managedNodePtr);
            }
        }

        public void ReleaseManaged()
        {
            if (_managedNodeHandle.IsAllocated)
            {
                _managedNodeHandle.Free();
            }
        }

        public static YogaNode GetManaged(IntPtr unmanagedNodePtr)
        {
            if (unmanagedNodePtr != IntPtr.Zero)
            {
                var managedNodePtr = Native.YGNodeGetContext(unmanagedNodePtr);
                var node = GCHandle.FromIntPtr(managedNodePtr).Target as YogaNode;
                if (node == null)
                {
                    throw new InvalidOperationException("YogaNode is already deallocated");
                }
                return node;
            }
            return null;
        }

#else

        public void SetContext(YogaNode node)
        {
            contexts[this.handle] = node;
        }

        public void ReleaseManaged() { }

        public static YogaNode GetManaged(IntPtr unmanagedNodePtr)
        {
            if (unmanagedNodePtr != IntPtr.Zero)
            {
                return contexts[unmanagedNodePtr];
            }
            return null;
        }
#endif
    }
}
