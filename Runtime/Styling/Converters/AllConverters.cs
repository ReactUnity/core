
using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public class AllConverters
    {
        static public StyleConverterBase DefaultConverter = new StringConverter();
        static public StyleConverterBase StringConverter = new StringConverter();

        static public StyleConverterBase FloatConverter = new FloatConverter();
        static public StyleConverterBase AngleConverter = new AngleConverter();
        static public StyleConverterBase LengthConverter = new LengthConverter();
        static public StyleConverterBase FontSizeConverter = new FontSizeConverter();
        static public StyleConverterBase DurationConverter = new DurationConverter();
        static public StyleConverterBase PercentageConverter = new PercentageConverter();
        static public StyleConverterBase ColorValueConverter = new ColorValueConverter();

        static public StyleConverterBase UrlConverter = new UrlConverter();
        static public StyleConverterBase YogaValueConverter = new YogaValueConverter();
        static public StyleConverterBase YogaValue2Converter = new YogaValue2.Converter();
        static public StyleConverterBase BorderRadiusConverter = new YogaValue2.Converter(false, ' ', true);
        static public StyleConverterBase Vector2Converter = new Vector2Converter();
        static public StyleConverterBase Vector3Converter = new Vector3Converter();
        static public StyleConverterBase IntConverter = new IntConverter();
        static public StyleConverterBase IterationCountConverter = new CountConverter();
        static public StyleConverterBase BoolConverter = new BoolConverter(new string[] { "true" }, new string[] { "false" });
        static public StyleConverterBase ColorConverter = new ColorConverter();
        static public StyleConverterBase BoxShadowConverter = new BoxShadow.Converter();
        static public StyleConverterBase ImageReferenceConverter = new ImageReference.Converter();
        static public StyleConverterBase ImageSourceConverter = new ImageReference.Converter(true);
        static public StyleConverterBase TextReferenceConverter = new TextReference.Converter(true);
        static public StyleConverterBase AudioReferenceConverter = new AudioReference.Converter();
        static public StyleConverterBase VideoReferenceConverter = new VideoReference.Converter();
        static public StyleConverterBase FontReferenceConverter = new FontReference.Converter();
        static public StyleConverterBase RotateConverter = new Vector3Converter((v) => new Vector3(0, 0, v), AngleConverter);
        static public StyleConverterBase ScaleConverter = new Vector3Converter(null, null, 1);
        static public StyleConverterBase TransitionPropertyConverter = new TransitionProperty.Converter();
        static public StyleConverterBase CursorConverter = new Types.Cursor.Converter();
        static public StyleConverterBase TimingFunctionConverter = new TimingFunctions.Converter();
        static public StyleConverterBase FontWeightConverter = new EnumConverter<TMPro.FontWeight>(false, false);
        static public StyleConverterBase ImageDefinitionConverter = new ImageDefinition.Converter();
        static public StyleConverterBase BackgroundSizeConverter = new BackgroundSize.Converter();


        private static Dictionary<Type, StyleConverterBase> Map = new Dictionary<Type, StyleConverterBase>()
        {
            { typeof(Vector2), Vector2Converter },
            { typeof(Vector3), Vector3Converter },
            { typeof(YogaValue), YogaValueConverter },
            { typeof(YogaValue2), YogaValue2Converter },
            { typeof(float), FloatConverter },
            { typeof(double), FloatConverter },
            { typeof(int), IntConverter },
            { typeof(string), StringConverter },
            { typeof(object), DefaultConverter },
            { typeof(Color), ColorConverter },
            { typeof(bool), BoolConverter },
            { typeof(Url), UrlConverter },
            { typeof(BoxShadow), BoxShadowConverter },
            { typeof(ImageReference), ImageReferenceConverter },
            { typeof(TextReference), TextReferenceConverter },
            { typeof(FontReference), FontReferenceConverter},
            { typeof(Types.Cursor), CursorConverter},
            { typeof(TimingFunction), TimingFunctionConverter },
            { typeof(TMPro.FontWeight), FontWeightConverter },
            { typeof(TransitionProperty), TransitionPropertyConverter },
            { typeof(ImageDefinition), ImageDefinitionConverter },
            { typeof(BackgroundSize), BackgroundSizeConverter },
        };

        public static StyleConverterBase Get<T>() => Get(typeof(T));

        public static StyleConverterBase Get(Type type)
        {
            var hasValue = Map.TryGetValue(type, out var converter);

            if (!hasValue && type.IsEnum)
                converter = new EnumConverter(type, true);

            return Map[type] = converter;
        }
    }
}
