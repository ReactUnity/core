
using Facebook.Yoga;
using ReactUnity.Styling.Parsers;
using System;
using UnityEngine;
using System.Collections.Generic;
using ReactUnity.Styling.Types;
using TMPro;

namespace ReactUnity.Styling
{
    internal class ParserMap
    {
        static public IStyleParser DefaultParser = new StringParser();
        static public IStyleParser StringParser = new StringParser();
        static public IStyleParser YogaValueParser = new YogaValueParser();
        static public IStyleParser FontSizeParser = new YogaValueParser();
        static public IStyleParser FloatParser = new FloatParser();
        static public IStyleParser Vector2Parser = new Vector2Parser();
        static public IStyleParser IntParser = new IntParser();
        static public IStyleParser ColorParser = new ColorParser();
        static public IStyleParser ShadowDefinitionParser = new ShadowDefinitionParser();


        private static Dictionary<Type, IStyleParser> Map = new Dictionary<Type, IStyleParser>()
        {
            { typeof(Vector2), Vector2Parser },
            { typeof(YogaValue), YogaValueParser },
            { typeof(float), FloatParser },
            { typeof(int), IntParser },
            { typeof(string), StringParser },
            { typeof(object), DefaultParser },
            { typeof(Color), ColorParser },
            { typeof(ShadowDefinition), ShadowDefinitionParser },
            { typeof(InteractionType), new EnumParser<InteractionType>() },
            { typeof(TextOverflowModes), new EnumParser<TextOverflowModes>() },
            { typeof(TextAlignmentOptions), new EnumParser<TextAlignmentOptions>() },
            { typeof(FontWeight), new EnumParser<FontWeight>() },
            { typeof(FontStyles), new EnumParser<FontStyles>() },
            { typeof(YogaOverflow), new EnumParser<YogaOverflow>() },
            { typeof(YogaPositionType), new EnumParser<YogaPositionType>() },
            { typeof(YogaDirection), new EnumParser<YogaDirection>() },
            { typeof(YogaFlexDirection), new EnumParser<YogaFlexDirection>() },
            { typeof(YogaDisplay), new EnumParser<YogaDisplay>() },
            { typeof(YogaJustify), new EnumParser<YogaJustify>() },
            { typeof(YogaAlign), new EnumParser<YogaAlign>() },
            { typeof(YogaWrap), new EnumParser<YogaWrap>() },
        };


        public static IStyleParser GetParser(Type type)
        {
            Map.TryGetValue(type, out var parser);
            return parser;
        }
    }
}
