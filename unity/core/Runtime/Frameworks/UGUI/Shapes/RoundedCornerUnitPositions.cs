using UnityEngine;

namespace ReactUnity.UGUI.Shapes
{
    public struct RoundedCornerUnitPositionData
    {
        public Vector2[] TLUnitPositions;
        public Vector2[] TRUnitPositions;
        public Vector2[] BRUnitPositions;
        public Vector2[] BLUnitPositions;


        public static void SetCornerUnitPositions(
            WebRoundingProperties rounding,
            ref RoundedCornerUnitPositionData cornerUnitPositions,
            bool forceUpdate = false
        )
        {
            SetUnitPosition(ref cornerUnitPositions.TLUnitPositions, rounding.TLResolution.AdjustedResolution, GeoUtils.HalfPI + Mathf.PI, rounding.TLResolution.MakeSharpCorner, forceUpdate);
            SetUnitPosition(ref cornerUnitPositions.TRUnitPositions, rounding.TRResolution.AdjustedResolution, 0.0f, rounding.TRResolution.MakeSharpCorner, forceUpdate);
            SetUnitPosition(ref cornerUnitPositions.BRUnitPositions, rounding.BRResolution.AdjustedResolution, GeoUtils.HalfPI, rounding.BRResolution.MakeSharpCorner, forceUpdate);
            SetUnitPosition(ref cornerUnitPositions.BLUnitPositions, rounding.BLResolution.AdjustedResolution, Mathf.PI, rounding.BLResolution.MakeSharpCorner, forceUpdate);
        }

        public static void SetUnitPosition(
            ref Vector2[] unitPositions,
            int resolution,
            float baseAngle,
            bool makeSharpCorner,
            bool forceUpdate = false
        )
        {
            var count = resolution;
            count += count % 2 == 0 ? 2 : 1;

            if (count % 2 == 0) count++;

            bool needsUpdate = forceUpdate;

            if (
                unitPositions == null ||
                unitPositions.Length != count
            )
            {
                unitPositions = new Vector2[count];
                needsUpdate = true;
            }

            if (needsUpdate)
            {
                float angleIncrement = GeoUtils.HalfPI / ((float) count - 2.0f);
                float angle;

                if (makeSharpCorner)
                {
                    angle = baseAngle + GeoUtils.QuarterPI;
                    float length = Mathf.Sqrt(2.0f);

                    for (int i = 0; i < count; i++)
                    {
                        unitPositions[i].x = Mathf.Sin(angle) * length;
                        unitPositions[i].y = Mathf.Cos(angle) * length;
                    }
                }
                else
                {
                    var passed = false;
                    for (int i = 0; i < count; i++)
                    {
                        var inc = Mathf.Min(angleIncrement * i, GeoUtils.HalfPI);
                        angle = baseAngle + inc;

                        if (!passed && inc >= GeoUtils.QuarterPI)
                        {
                            passed = true;
                            unitPositions[i].x = Mathf.Sin(angle);
                            unitPositions[i].y = Mathf.Cos(angle);
                            i++;
                        }

                        unitPositions[i].x = Mathf.Sin(angle);
                        unitPositions[i].y = Mathf.Cos(angle);
                    }
                }
            }
        }

    }
}
