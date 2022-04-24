
using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Animations;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Converters
{
    public class AllConverters
    {
        static public IStyleConverter DefaultConverter = new StringConverter();
        static public IStyleConverter StringConverter = new StringConverter();

        static public IStyleConverter FloatConverter = new FloatConverter();
        static public IStyleConverter AngleConverter = new AngleConverter();
        static public IStyleConverter LengthConverter = new LengthConverter();
        static public IStyleConverter FontSizeConverter = new FontSizeConverter();
        static public IStyleConverter DurationConverter = new DurationConverter();
        static public IStyleConverter PercentageConverter = new PercentageConverter();
        static public IStyleConverter ColorValueConverter = new ColorValueConverter();

        static public IStyleConverter UrlConverter = new UrlConverter();
        static public IStyleConverter GeneralConverter = new GeneralConverter();
        static public IStyleConverter YogaValueConverter = new YogaValueConverter();
        static public IStyleConverter YogaValue2Converter = new YogaValue2.Converter();
        static public IStyleConverter BorderRadiusConverter = new YogaValue2.Converter(false, ' ', true);
        static public IStyleConverter Vector2Converter = new Vector2Converter();
        static public IStyleConverter Vector3Converter = new Vector3Converter();
        static public IStyleConverter IntConverter = new IntConverter();
        static public IStyleConverter IterationCountConverter = new CountConverter();
        static public IStyleConverter BoolConverter = new BoolConverter(new string[] { "true" }, new string[] { "false" });
        static public IStyleConverter ColorConverter = new ColorConverter();
        static public IStyleConverter BoxShadowConverter = new BoxShadow.Converter();
        static public IStyleConverter ImageReferenceConverter = new ImageReference.Converter();
        static public IStyleConverter ImageSourceConverter = new ImageReference.Converter(true);
        static public IStyleConverter TextReferenceConverter = new TextReference.Converter(true);
        static public IStyleConverter AudioReferenceConverter = new AudioReference.Converter();
        static public IStyleConverter VideoReferenceConverter = new VideoReference.Converter();
        static public IStyleConverter FontReferenceConverter = new FontReference.Converter();
        static public IStyleConverter RotateConverter = new Vector3Converter((v) => new Vector3(0, 0, v), AngleConverter);
        static public IStyleConverter TransitionPropertyConverter = new TransitionProperty.Converter();
        static public IStyleConverter CursorListConverter = new CursorList.Converter();
        static public IStyleConverter TimingFunctionConverter = new TimingFunctions.Converter();
        static public IStyleConverter FontWeightConverter = new EnumConverter<TMPro.FontWeight>(false, false);
        static public IStyleConverter ImageDefinitionConverter = new ImageDefinition.Converter();
        static public IStyleConverter BackgroundSizeConverter = new BackgroundSize.Converter();


        private static Dictionary<Type, IStyleConverter> Map = new Dictionary<Type, IStyleConverter>()
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
            { typeof(CursorList), CursorListConverter},
            { typeof(TimingFunction), TimingFunctionConverter },
            { typeof(TMPro.FontWeight), FontWeightConverter },
            { typeof(TransitionProperty), TransitionPropertyConverter },
            { typeof(ImageDefinition), ImageDefinitionConverter },
            { typeof(BackgroundSize), BackgroundSizeConverter },
        };

        public static GeneralConverter Get<T>() => Get(typeof(T));

        public static GeneralConverter Get(Type type)
        {
            var hasValue = Map.TryGetValue(type, out var converter);

            if (converter is GeneralConverter gc) return gc;

            if (!hasValue && type.IsEnum)
                converter = new EnumConverter(type, true);

            Map[type] = gc = new GeneralConverter(converter);
            return gc;
        }
    }
}
