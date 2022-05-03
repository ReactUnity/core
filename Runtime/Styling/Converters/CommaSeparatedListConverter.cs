using System;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;

namespace ReactUnity.Styling.Converters
{
    public abstract class CommaSeparatedListConverter<ListType, ItemType> : TypedStyleConverterBase<ListType>
        where ListType : CommaSeparatedList<ItemType> where ItemType : ICommaSeparatedListItem
    {
        protected abstract StyleConverterBase SingleConverter { get; }

        protected abstract ListType CreateItems(params ItemType[] items);

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            if (value is ItemType t) return Constant(CreateItems(t), out result);
            return base.ConvertInternal(value, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var splits = ParserHelpers.Split(value, ',');
            return ComputedList.Create(out result, splits.OfType<object>().ToList(), SingleConverter,
                (List<object> resolvedValues, out IComputedValue rs) => {
                    rs = new ComputedConstant(CreateItems(resolvedValues.OfType<ItemType>().ToArray()));
                    return true;
                });
        }
    }
}
