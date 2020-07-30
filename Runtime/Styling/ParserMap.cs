
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
        static public IStyleParser IntParser = new IntParser();
        static public IStyleParser ColorParser = new ColorParser();
        static public IStyleParser ShadowDefinitionParser = new ShadowDefinitionParser();


        private static Dictionary<Type, IStyleParser> Map = new Dictionary<Type, IStyleParser>()
        {
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
        };


        public static IStyleParser GetParser(Type type)
        {
            Map.TryGetValue(type, out var parser);
            return parser;
        }
    }
}
