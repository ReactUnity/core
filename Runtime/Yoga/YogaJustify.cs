namespace Yoga
{
    public enum YogaJustify
    {
        // Auto is Yoga's justify-self default and shifts every member below it -- these cross
        // the P/Invoke boundary as bare ints, so the numbering has to match YGEnums.h exactly.
        Auto = 0,
        FlexStart = 1,
        Center = 2,
        FlexEnd = 3,
        SpaceBetween = 4,
        SpaceAround = 5,
        SpaceEvenly = 6,
        Stretch = 7,
        Start = 8,
        End = 9,
    }
}
