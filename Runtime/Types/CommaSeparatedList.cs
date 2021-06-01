using ReactUnity.Styling.Parsers;
using System.Text;

namespace ReactUnity.Types
{
    public interface ICommaSeparatedListItem
    {
        string Definition { get; }
        bool Valid { get; }
    }

    public abstract class CommaSeparatedList<T> where T : ICommaSeparatedListItem
    {
        public string Definition { get; }
        public T[] Items { get; }
        public bool Any { get; private set; } = false;

        public CommaSeparatedList(T item)
        {
            Items = new[] { item };
            Any = Any || item.Valid;
            Definition = item.Definition;
        }

        public CommaSeparatedList(T[] items)
        {
            Items = items ?? new T[0];

            var sb = new StringBuilder();
            for (int i = 0; i < items.Length; i++)
            {
                var item = items[i];
                Any = Any || item.Valid;

                sb.Append(item.Definition);
                sb.Append(", ");
            }

            Definition = sb.ToString();
        }

        public CommaSeparatedList(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ',');

            Items = new T[splits.Count];

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];
                var item = CreateItem(split);
                Items[i] = item;
                Any = Any || item.Valid;
            }
        }

        protected abstract T CreateItem(string definition);

        public static bool operator ==(CommaSeparatedList<T> left, CommaSeparatedList<T> right) => left?.Definition == right?.Definition;
        public static bool operator !=(CommaSeparatedList<T> left, CommaSeparatedList<T> right) => left?.Definition != right?.Definition;
        public override bool Equals(object obj) => base.Equals(obj);
        public override int GetHashCode() => Definition.GetHashCode();
    }
}
