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
            ref RoundedCornerUnitPositionData cornerUnitPositions
        )
        {
            SetUnitPosition(ref cornerUnitPositions.TLUnitPositions, rounding.TLResolution.AdjustedResolution, GeoUtils.HalfPI + Mathf.PI, rounding.TLResolution.MakeSharpCorner);
            SetUnitPosition(ref cornerUnitPositions.TRUnitPositions, rounding.TRResolution.AdjustedResolution, 0.0f, rounding.TRResolution.MakeSharpCorner);
            SetUnitPosition(ref cornerUnitPositions.BRUnitPositions, rounding.BRResolution.AdjustedResolution, GeoUtils.HalfPI, rounding.BRResolution.MakeSharpCorner);
            SetUnitPosition(ref cornerUnitPositions.BLUnitPositions, rounding.BLResolution.AdjustedResolution, Mathf.PI, rounding.BLResolution.MakeSharpCorner);
        }

        public static void SetUnitPosition(
            ref Vector2[] unitPositions,
            int resolution,
            float baseAngle,
            bool makeSharpCorner
        )
        {
            var count = resolution;
            count += count % 2 == 0 ? 2 : 1;

            if (count % 2 == 0)
            {
                count++;
            }

            bool needsUpdate = false;

            if (
                unitPositions == null ||
                unitPositions.Length != count
            )
            {
                unitPositions = new Vector2[count];

                for (int i = 0; i < unitPositions.Length; i++)
                {
                    unitPositions[i] = GeoUtils.ZeroV2;
                }

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
