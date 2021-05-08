
using Facebook.Yoga;
using ReactUnity.Styling.Parsers;
using System;
using UnityEngine;
using System.Collections.Generic;
using ReactUnity.Styling.Types;
using TMPro;
using ReactUnity.Types;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    internal class ConverterMap
    {
        static public IStyleConverter DefaultConverter = new StringConverter();
        static public IStyleConverter StringConverter = new StringConverter();

        static public IStyleConverter FloatConverter = new FloatConverter();
        static public IStyleConverter AngleConverter = new AngleConverter();
        static public IStyleConverter LengthConverter = new LengthConverter();
        static public IStyleConverter DurationConverter = new DurationConverter();
        static public IStyleConverter PercentageConverter = new PercentageConverter();

        static public IStyleConverter UrlConverter = new UrlConverter();
        static public IStyleConverter GeneralConverter = new GeneralConverter();
        static public IStyleConverter YogaValueConverter = new YogaValueConverter();
        static public IStyleConverter YogaValue2Converter = new YogaValue2Converter();
        static public IStyleConverter Vector2Converter = new Vector2Converter();
        static public IStyleConverter Vector3Converter = new Vector3Converter();
        static public IStyleConverter IntConverter = new IntConverter();
        static public IStyleConverter BoolConverter = new BoolConverter(new string[] { "true" }, new string[] { "false" });
        static public IStyleConverter ColorConverter = new ColorConverter();
        static public IStyleConverter ShadowDefinitionConverter = new ShadowDefinitionConverter();
        static public IStyleConverter ImageReferenceConverter = new ImageReferenceConverter();
        static public IStyleConverter VideoReferenceConverter = new VideoReferenceConverter();
        static public IStyleConverter FontReferenceConverter = new FontReferenceConverter();
        static public IStyleConverter RotateConverter = new Vector3Converter((v) => new Vector3(0, 0, v));
        static public IStyleConverter TransitionListConverter = new TransitionListConverter();

        private static Dictionary<Type, IStyleConverter> Map = new Dictionary<Type, IStyleConverter>()
        {
            { typeof(Vector2), Vector2Converter },
            { typeof(YogaValue), YogaValueConverter },
            { typeof(YogaValue2), YogaValue2Converter },
            { typeof(float), FloatConverter },
            { typeof(double), FloatConverter },
            { typeof(int), IntConverter },
            { typeof(string), StringConverter },
            { typeof(object), DefaultConverter },
            { typeof(Color), ColorConverter },
            { typeof(bool), BoolConverter },
            { typeof(ShadowDefinition), ShadowDefinitionConverter },
            { typeof(ImageReference), ImageReferenceConverter },
            { typeof(FontReference), FontReferenceConverter},
            { typeof(TransitionList), TransitionListConverter},
            { typeof(Appearance), new EnumConverter<Appearance>() },
            { typeof(Navigation.Mode), new EnumConverter<Navigation.Mode>() },
            { typeof(PointerEvents), new EnumConverter<PointerEvents>() },
            { typeof(TextOverflowModes), new EnumConverter<TextOverflowModes>() },
            { typeof(TextAlignmentOptions), new EnumConverter<TextAlignmentOptions>() },
            { typeof(FontWeight), new EnumConverter<FontWeight>() },
            { typeof(FontStyles), new EnumConverter<FontStyles>() },
            { typeof(YogaOverflow), new EnumConverter<YogaOverflow>() },
            { typeof(YogaPositionType), new EnumConverter<YogaPositionType>() },
            { typeof(YogaDirection), new EnumConverter<YogaDirection>() },
            { typeof(YogaFlexDirection), new EnumConverter<YogaFlexDirection>() },
            { typeof(YogaDisplay), new EnumConverter<YogaDisplay>() },
            { typeof(YogaJustify), new EnumConverter<YogaJustify>() },
            { typeof(YogaAlign), new EnumConverter<YogaAlign>() },
            { typeof(YogaWrap), new EnumConverter<YogaWrap>() },
        };

        public static IStyleConverter GetConverter(Type type)
        {
            Map.TryGetValue(type, out var converter);
            return new GeneralConverter(converter);
        }
    }
}
