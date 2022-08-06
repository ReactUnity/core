using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity
{
    public class FormData
    {
        private Dictionary<string, List<Tuple<object, string>>> fields = new Dictionary<string, List<Tuple<object, string>>>();

        internal WWWForm GetForm()
        {
            var form = new WWWForm();

            foreach (var field in fields)
            {
                foreach (var item in field.Value)
                {
                    if (item.Item1 is string s) form.AddField(field.Key, s);
                    else if (item.Item1 is int i) form.AddField(field.Key, i);
                    else if (item.Item1 is byte[] b) form.AddBinaryData(field.Key, b, item.Item2);
                }
            }

            return form;
        }

        public void append(string name, object value, string fileName = null)
        {
            if (!fields.TryGetValue(name, out var field))
            {
                fields[name] = field = new List<Tuple<object, string>>();
            }

            field.Add(Tuple.Create(value, fileName));
        }
        public void delete(string name)
        {
            fields.Remove(name);
        }
        public object get(string name)
        {
            if (fields.TryGetValue(name, out var field))
            {
                if (field.Count > 0) return field[0].Item1;
            }
            return null;
        }
        public object[] getAll(string name)
        {
            if (fields.TryGetValue(name, out var field))
            {
                return field.Select(x => x.Item1).ToArray();
            }
            return new object[0];
        }
        public bool has(string name)
        {
            if (fields.TryGetValue(name, out var field))
            {
                if (field.Count > 0) return true;
            }
            return false;
        }
        public void set(string name, object value, string fileName = null)
        {
            var field = fields[name] = new List<Tuple<object, string>>();
            field.Add(Tuple.Create(value, fileName));
        }
    }
}
