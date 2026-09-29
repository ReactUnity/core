using System.Collections.Generic;

namespace ReactUnity
{
    /// <summary>
    /// The spare components of one tag and pool key. Each is filed under the <c>className</c> it last had,
    /// and a request for the same one gets it back first, with the graphics that role already built.
    /// </summary>
    public class PoolStack
    {
        // Only hints with spares under them are kept, so this is bounded by the pool, not by the app's class names.
        private readonly Dictionary<string, Stack<IPoolableComponent>> byHint = new Dictionary<string, Stack<IPoolableComponent>>();
        private readonly Stack<Stack<IPoolableComponent>> emptied = new Stack<Stack<IPoolableComponent>>();
        private string lastHint;

        public int Count { get; private set; }

        public void Push(IPoolableComponent cmp, string hint = null)
        {
            hint = hint ?? "";
            if (!byHint.TryGetValue(hint, out var stack))
                byHint[hint] = stack = emptied.Count > 0 ? emptied.Pop() : new Stack<IPoolableComponent>();
            stack.Push(cmp);
            lastHint = hint;
            Count++;
        }

        /// <summary>A spare filed under <paramref name="hint"/>, else the latest one, else null.</summary>
        public IPoolableComponent Pop(string hint = null)
        {
            if (Count == 0) return null;
            hint = hint ?? "";

            if (!byHint.TryGetValue(hint, out var stack))
            {
                hint = lastHint;
                if (hint == null || !byHint.TryGetValue(hint, out stack))
                {
                    foreach (var kv in byHint)
                    {
                        hint = kv.Key;
                        stack = kv.Value;
                        break;
                    }
                }
            }

            var res = stack.Pop();
            Count--;
            if (stack.Count == 0)
            {
                byHint.Remove(hint);
                emptied.Push(stack);
            }
            return res;
        }
    }
}
