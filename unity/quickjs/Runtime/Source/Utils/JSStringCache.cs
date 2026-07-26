using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    using Native;

    public class JSStringCache
    {
        public class Slot
        {
            public int next;
            public JSValue jsValue;
            public string stringValue;
        }

        private bool _disposed;

        // js string => slot id
        private Dictionary<JSValue, int> _jsvMap = new Dictionary<JSValue, int>();
        // c# string => slot id
        private Dictionary<string, int> _strMap = new Dictionary<string, int>();

        private int _freeIndex = -1;
        private List<Slot> _slots = new List<Slot>();

        private JSContext _ctx;

        public JSStringCache(JSContext ctx)
        {
            _ctx = ctx;
        }

        public void Destroy()
        {
            if (_disposed)
            {
                return;
            }
            _disposed = true;
            Clear();
        }

        public int GetStringCount() {
            return _strMap.Count;
        }

        public void Clear()
        {
            foreach (var kv in _strMap)
            {
                var slotIndex = kv.Value;
                var slot = _slots[slotIndex];
                JSApi.JS_FreeValue(_ctx, slot.jsValue);
            }
            _strMap.Clear();
            _jsvMap.Clear();
            _slots.Clear();
        }

        public void RemoveValue(string o)
        {
            if (_disposed || o == null)
            {
                return;
            }

            int slotIndex;
            if (_strMap.TryGetValue(o, out slotIndex))
            {
                var slot = _slots[slotIndex];
                _strMap.Remove(o);
                _jsvMap.Remove(slot.jsValue);
                JSApi.JS_FreeValue(_ctx, slot.jsValue);
                slot.jsValue = JSApi.JS_UNDEFINED;
                slot.stringValue = null;
                slot.next = _freeIndex;
                _freeIndex = slotIndex;
            }
        }

        /// <summary>
        /// 返回值并未调整计数, 外部需要使用时, 自行 DupValue
        /// </summary>
        public bool AddValue(string stringValue, out JSValue jsValue)
        {
            if (_disposed || stringValue == null)
            {
                jsValue = JSApi.JS_UNDEFINED;
                return false;
            }
            jsValue = _ctx.NewString(stringValue);
            if (jsValue.IsString())
            {
                return _AddPair(jsValue, stringValue) >= 0;
            }
            JSApi.JS_FreeValue(_ctx, jsValue);
            jsValue = JSApi.JS_UNDEFINED;
            return false;
        }

        public bool AddValue(JSValue jsValue, out string stringValue)
        {
            if (_disposed || !jsValue.IsString())
            {
                stringValue = null;
                return false;
            }

            stringValue = JSApi.GetNonNullString(_ctx, jsValue);
            if (stringValue != null)
            {
                return _AddPair(JSApi.JS_DupValue(_ctx, jsValue), stringValue) >= 0;
            }

            return false;
        }

        private int _AddPair(JSValue jsValue, string stringValue)
        {
            if (_disposed)
            {
                return -1;
            }

            int findSlotIndex;
            if (_strMap.TryGetValue(stringValue, out findSlotIndex))
            {
#if JSB_DEBUG
                var slot = _slots[findSlotIndex];
                if (slot.jsValue != jsValue)
                {
                    var logger = ScriptEngine.GetLogger(_ctx);
                    if (logger != null)
                    {
                        logger.Write(LogLevel.Warn, "duplicated string cache: {0} != {1} => {2}", slot.jsValue, jsValue, slot.stringValue);
                    }
                }
#endif
                return findSlotIndex;
            }

            if (_freeIndex < 0)
            {
                var slot = new Slot();
                var id = _slots.Count;
                _slots.Add(slot);
                slot.next = -1;
                slot.stringValue = stringValue;
                slot.jsValue = jsValue;
                _strMap[stringValue] = id;
                _jsvMap[jsValue] = id;
                return id;
            }
            else
            {
                var id = _freeIndex;
                var slot = _slots[id];
                _freeIndex = slot.next;
                slot.next = -1;
                slot.stringValue = stringValue;
                slot.jsValue = jsValue;
                _strMap[stringValue] = id;
                _jsvMap[jsValue] = id;
                return id;
            }
        }

        public bool TryGetValue(string stringValue, out JSValue jsValue)
        {
            if (!_disposed && stringValue != null)
            {
                int slotIndex;
                if (_strMap.TryGetValue(stringValue, out slotIndex))
                {
                    var slot = _slots[slotIndex];
                    jsValue = slot.jsValue;
                    return true;
                }
            }

            jsValue = JSApi.JS_UNDEFINED;
            return false;
        }

        public bool GetValue(string stringValue, out JSValue jsValue)
        {
            if (!_disposed && stringValue != null)
            {
                int slotIndex;
                if (_strMap.TryGetValue(stringValue, out slotIndex))
                {
                    var slot = _slots[slotIndex];
                    jsValue = slot.jsValue;
                    return true;
                }

                return AddValue(stringValue, out jsValue);
            }

            jsValue = JSApi.JS_UNDEFINED;
            return false;
        }

        public bool TryGetValue(JSValue jsValue, out string stringValue)
        {
            if (!_disposed && jsValue.IsString())
            {
                int slotIndex;
                if (_jsvMap.TryGetValue(jsValue, out slotIndex))
                {
                    var slot = _slots[slotIndex];
                    stringValue = slot.stringValue;
                    return true;
                }
            }

            stringValue = null;
            return false;
        }

        public bool GetValue(JSValue jsValue, out string stringValue)
        {
            if (!_disposed && jsValue.IsString())
            {
                int slotIndex;
                if (_jsvMap.TryGetValue(jsValue, out slotIndex))
                {
                    var slot = _slots[slotIndex];
                    stringValue = slot.stringValue;
                    return true;
                }

                return AddValue(jsValue, out stringValue);
            }

            stringValue = null;
            return false;
        }
    }
}
