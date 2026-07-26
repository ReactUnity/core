#if !JSB_UNITYLESS

namespace QuickJS.Unity
{
    using Native;

    public interface IScriptEditorSupport : IScriptInstancedObject
    {
        bool isStandaloneScript { get; }

        bool isScriptInstanced { get; }

        JSScriptRef scriptRef { get; set; }

        JSContext ctx { get; }

        JSScriptProperties properties { get; }

        bool IsValid();

        bool CreateScriptInstance();
    }
}

#endif
