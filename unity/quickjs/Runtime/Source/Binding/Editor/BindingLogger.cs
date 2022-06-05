
namespace QuickJS.Binding
{
    public interface IBindingLogger
    {
        void Log(string message);
        void LogWarning(string message);
        void LogError(string message);
    }
}
