using System.Collections.Generic;
using System.IO;
using NUnit.Framework;
using UnityEngine;

namespace ReactUnity.Tests
{
    public static class Assertions
    {
        public static void AssertListExhaustive<T>(this List<T> list, params T[] expectedItems)
        {
            Assert.AreEqual(expectedItems, list);
            list.Clear();
        }

        public static void Snapshot(string name, int width = 300, int height = 300)
        {
            Texture2D capture = null, croppedCapture = null, expectedTexture = null;

            try
            {
                if (!name.EndsWith(".png")) name += ".png";

                var basePath = Path.GetFullPath("Packages/com.reactunity.core/Tests/.snapshots");
                var filePath = Path.Combine(basePath, name);
                var dir = Path.GetDirectoryName(filePath);

                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);

                capture = ScreenCapture.CaptureScreenshotAsTexture();

                if (capture.width < width || capture.height < height)
                {
                    Assert.Fail($"Cannot verify texture on this screen size. Screen size must be greater than {width}x{height}");
                    return;
                }

                var croppedBytes = capture.GetPixels(0, capture.height - height, width, height);
                croppedCapture = new Texture2D(width, height, TextureFormat.RGB24, false);
                croppedCapture.SetPixels(croppedBytes);
                croppedCapture.Apply();


                if (!File.Exists(filePath))
                {
                    File.WriteAllBytes(filePath, croppedCapture.EncodeToPNG());
                    Debug.LogWarning("Snapshot file did not exist. Verify manually at: " + filePath);
                }

                var bytes = File.ReadAllBytes(filePath);
                expectedTexture = new Texture2D(width, height, TextureFormat.RGB24, false);
                if (!expectedTexture.LoadImage(bytes))
                {
                    Assert.Fail("Cannot load image into texture");
                    return;
                }
                expectedTexture.Apply();

                CompareTexture(expectedTexture, croppedCapture);
            }
            finally
            {
                if (capture) Object.Destroy(capture);
                if (croppedCapture) Object.Destroy(croppedCapture);
                if (expectedTexture) Object.Destroy(expectedTexture);
            }
        }

        private static void CompareTexture(Texture2D first, Texture2D second)
        {
            Assert.AreEqual(first.width, second.width, "Textures should have same width");
            Assert.AreEqual(first.height, second.height, "Textures should have same height");

            Color[] firstPix = first.GetPixels();
            Color[] secondPix = second.GetPixels();

            Assert.AreEqual(firstPix.Length, secondPix.Length, "Textures should have same size");

            for (int i = 0; i < firstPix.Length; i++)
            {
                if (firstPix[i] != secondPix[i])
                    Assert.Fail($"Textures should have same color at {i % first.width}x{Mathf.FloorToInt(i / first.width)}");
            }
        }
    }
}
