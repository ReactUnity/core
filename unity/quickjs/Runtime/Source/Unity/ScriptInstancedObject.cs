#if !JSB_UNITYLESS

namespace QuickJS.Unity
{
    using Native;

    public interface IScriptInstancedObject
    {
        int IsInstanceOf(JSValue ctor);
        JSValue CloneValue();
        JSValue SetScriptInstance(JSContext ctx, JSValue ctor, bool execAwake);
        void ReleaseScriptInstance();
    }
}

#endif // JSB_UNITYLESS
