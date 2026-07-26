using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Binding
{
    public partial class BindingManager
    {
        public void Info(string message)
        {
            _logWriter?.AppendLine(message);
        }

        public void Info(string fmt, object arg1)
        {
            _logWriter?.AppendLine(fmt, arg1);
        }

        public void Info(string fmt, object arg1, string arg2)
        {
            _logWriter?.AppendLine(fmt, arg1, arg2);
        }

        public void Info(string fmt, params object[] args)
        {
            _logWriter?.AppendLine(fmt, args);
        }

        public void Error(Exception exception)
        {
            var str = string.Format("{0}\n{1}", exception.Message, exception.StackTrace);
            if (exception.InnerException != null)
            {
                str += string.Format("=== Inner Exception ===\n{0}\n{1}", exception.InnerException.Message, exception.InnerException.StackTrace);
            }
            Error(str);
        }

        public void Error(string message)
        {
            _bindingLogger?.LogError(message);
            _logWriter?.AppendLine(message);
        }

        public void Error(string fmt, object arg1)
        {
            _bindingLogger?.LogError(string.Format(fmt, arg1));
            _logWriter?.AppendLine(fmt, arg1);
        }

        public void Error(string fmt, object arg1, string arg2)
        {
            _bindingLogger?.LogError(string.Format(fmt, arg1, arg2));
            _logWriter?.AppendLine(fmt, arg1, arg2);
        }

        public void Error(string fmt, params object[] args)
        {
            _bindingLogger?.LogError(string.Format(fmt, args));
            _logWriter?.AppendLine(fmt, args);
        }

        public void Warn(string message)
        {
            _bindingLogger?.LogWarning(message);
            _logWriter?.AppendLine(message);
        }

        public void Warn(string fmt, object arg1)
        {
            _bindingLogger?.LogWarning(string.Format(fmt, arg1));
            _logWriter?.AppendLine(fmt, arg1);
        }

        public void Warn(string fmt, object arg1, string arg2)
        {
            _bindingLogger?.LogWarning(string.Format(fmt, arg1, arg2));
            _logWriter?.AppendLine(fmt, arg1, arg2);
        }

        public void Warn(string fmt, params object[] args)
        {
            _bindingLogger?.LogWarning(string.Format(fmt, args));
            _logWriter?.AppendLine(fmt, args);
        }
    }
}
