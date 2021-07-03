
using Facebook.Yoga;
using ReactUnity.Styling.Parsers;
using System;
using UnityEngine;
using System.Collections.Generic;
using ReactUnity.Types;
using ReactUnity.Animations;

namespace ReactUnity.Styling
{
    internal class Converters
    {
        static public IStyleConverter DefaultConverter = new StringConverter();
        static public IStyleConverter StringConverter = new StringConverter();

        static public IStyleConverter FloatConverter = new FloatConverter();
        static public IStyleConverter AngleConverter = new AngleConverter();
        static public IStyleConverter LengthConverter = new LengthConverter();
        static public IStyleConverter DurationConverter = new DurationConverter();
        static public IStyleConverter PercentageConverter = new PercentageConverter();
        static public IStyleConverter ColorValueConverter = new ColorValueConverter();

        static public IStyleConverter UrlConverter = new UrlConverter();
        static public IStyleConverter GeneralConverter = new GeneralConverter();
        static public IStyleConverter YogaValueConverter = new YogaValueConverter();
        static public IStyleConverter YogaValue2Converter = new YogaValue2.Converter();
        static public IStyleConverter Vector2Converter = new Vector2Converter();
        static public IStyleConverter Vector3Converter = new Vector3Converter();
        static public IStyleConverter IntConverter = new IntConverter();
        static public IStyleConverter BoolConverter = new BoolConverter(new string[] { "true" }, new string[] { "false" });
        static public IStyleConverter ColorConverter = new ColorConverter();
        static public IStyleConverter ImageReferenceConverter = new ImageReference.Converter();
        static public IStyleConverter AudioReferenceConverter = new AudioReference.Converter();
        static public IStyleConverter VideoReferenceConverter = new VideoReference.Converter();
        static public IStyleConverter FontReferenceConverter = new FontReference.Converter();
        static public IStyleConverter RotateConverter = new Vector3Converter((v) => new Vector3(0, 0, v), AngleConverter);
        static public IStyleConverter TransitionListConverter = new TransitionList.Converter();
        static public IStyleConverter AnimationListConverter = new AnimationList.Converter();
        static public IStyleConverter AudioListConverter = new AudioList.Converter();
        static public IStyleConverter BoxShadowListConverter = new BoxShadowList.Converter();
        static public IStyleConverter TimingFunctionConverter = new TimingFunctions.Converter();


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
            { typeof(BoxShadowList), BoxShadowListConverter },
            { typeof(ImageReference), ImageReferenceConverter },
            { typeof(FontReference), FontReferenceConverter},
            { typeof(TransitionList), TransitionListConverter},
            { typeof(AnimationList), AnimationListConverter},
            { typeof(AudioList), AudioListConverter},
            { typeof(TimingFunction), TimingFunctionConverter },
        };

        public static IStyleConverter Get<T>() => Get(typeof(T));

        public static IStyleConverter Get(Type type)
        {
            var hasValue = Map.TryGetValue(type, out var converter);

            if (!hasValue && type.IsEnum)
                converter = Map[type] = new EnumConverter(type, true);

            return new GeneralConverter(converter);
        }
    }
}
