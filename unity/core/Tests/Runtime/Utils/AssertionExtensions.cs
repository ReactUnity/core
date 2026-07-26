using System.Collections.Generic;
using System.IO;
using NUnit.Framework;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Tests
{
    public static class Assertions
    {
        public static float SnapshotFailRatio = 0.005f;

        public static void AssertListExhaustive<T>(this List<T> list, params T[] expectedItems)
        {
            Assert.AreEqual(expectedItems, list);
            list.Clear();
        }

        public static void Snapshot(string name, string namePrefix = null, int width = 300, int height = 300)
        {
            if (TestHelpers.IsNoGraphics())
            {
                Assert.Inconclusive("Graphics are not enabled. Snapshot tests cannot be run without graphics.");
                return;
            }

            Texture2D capture = null, croppedCapture = null, expectedTexture = null;

            try
            {
                if (!name.FastEndsWith(".png")) name += ".png";

                var basePath = Path.GetFullPath("Packages/com.reactunity.core/Tests/.snapshots");
                var os = SystemInfo.operatingSystemFamily.ToString().ToLower();
                var filePath = Path.Combine(basePath, os, name);

                var dir = Path.GetDirectoryName(filePath);
                var fileName = Path.GetFileName(filePath);

                if (!string.IsNullOrWhiteSpace(namePrefix))
                {
                    fileName = namePrefix + "-" + fileName;
                    name = namePrefix + "-" + name;
                }
                filePath = Path.Combine(dir, fileName);

                var lockfile = Path.Combine(basePath, "snapshots.lock");

                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);

                capture = CaptureScreenshot();

                if (capture.width < width || capture.height < height)
                {
                    Assert.Fail($"Snapshot failed ({name}): Cannot verify texture on this screen size. Screen size must be greater than {width}x{height}");
                    return;
                }

                var croppedBytes = capture.GetPixels(0, capture.height - height, width, height);
                croppedCapture = new Texture2D(width, height, TextureFormat.RGB24, false);
                croppedCapture.SetPixels(croppedBytes);
                croppedCapture.Apply();


                if (!File.Exists(filePath))
                {
                    File.WriteAllBytes(filePath, croppedCapture.EncodeToPNG());
                    Debug.LogWarning($"Snapshot ({name}) did not exist. Verify manually at: {filePath}");

                    File.WriteAllText(lockfile, "updated");
                }
                else
                {
                    var bytes = File.ReadAllBytes(filePath);
                    expectedTexture = new Texture2D(width, height, TextureFormat.RGB24, false);
                    if (!expectedTexture.LoadImage(bytes))
                    {
                        Assert.Fail($"Snapshot failed ({name}): Cannot load image into texture");
                        return;
                    }
                    expectedTexture.Apply();

                    if (TestHelpers.ShouldOverwriteSnapshots)
                    {
                        var failed = false;
                        var failMessage = "";
                        try
                        {
                            var diff = CompareTexture(expectedTexture, croppedCapture, name);
                            failed = diff > 0;
                            if (diff > 0) failMessage = $"{diff} pixels were different.";
                        }
                        catch (AssertionException ex)
                        {
                            failed = true;
                            failMessage = ex.Message;
                        }

                        if (failed)
                        {
                            File.WriteAllBytes(filePath, croppedCapture.EncodeToPNG());
                            File.WriteAllText(lockfile, "updated");

                            System.Console.WriteLine(
                                $"Snapshot failed ({name}). Overwriting old snapshots as per the preferences." +
                                (string.IsNullOrWhiteSpace(failMessage) ? "" : $" The message was:\n{failMessage}"));
                        }
                        else if (!string.IsNullOrWhiteSpace(failMessage))
                        {
                            Debug.Log($"Snapshot ({name}): {failMessage}");
                        }
                    }
                    else
                    {
                        var diff = CompareTexture(expectedTexture, croppedCapture, name);
                        if (diff > 0) Debug.Log($"Snapshot ({name}): {diff} pixels were different.");
                    }
                }
            }
            finally
            {
                if (capture) Object.Destroy(capture);
                if (croppedCapture) Object.Destroy(croppedCapture);
                if (expectedTexture) Object.Destroy(expectedTexture);
            }
        }

        private static Texture2D CaptureScreenshot()
        {
            var cam = Camera.main;
            var render = new RenderTexture(Screen.width, Screen.height, 24);
            cam.targetTexture = render;
            cam.Render();
            cam.targetTexture = null;

            RenderTexture.active = render;
            Texture2D screenshot = new Texture2D(render.width, render.height, TextureFormat.RGB24, false);
            screenshot.ReadPixels(new Rect(0, 0, render.width, render.height), 0, 0);
            screenshot.Apply();
            RenderTexture.active = null;

            return screenshot;
        }

        private static float CompareTexture(Texture2D first, Texture2D second, string name)
        {
            Assert.AreEqual(first.width, second.width, $"Snapshot failed ({name}): Textures should have same width");
            Assert.AreEqual(first.height, second.height, $"Snapshot failed ({name}): Textures should have same height");

            Color[] firstPix = first.GetPixels();
            Color[] secondPix = second.GetPixels();

            Assert.AreEqual(firstPix.Length, secondPix.Length, $"Snapshot failed ({name}): Textures should have same size");

            var failCount = 0f;
            var totalCount = first.width * first.height;

            for (int i = 0; i < firstPix.Length; i++)
            {
                if (firstPix[i] != secondPix[i]) failCount++;
            }

            var failRatio = failCount / totalCount;

            if (failRatio > SnapshotFailRatio)
            {
                Assert.Fail($"Snapshot failed ({name}): {failCount} pixels were different.");
            }

            return failCount;
        }
    }
}
