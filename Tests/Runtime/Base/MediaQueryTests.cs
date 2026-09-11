using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class MediaQueryTests : TestBase
    {
        public MediaQueryTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Style = "view { color: white; } @media(min-asd: 600px) { view { color: red; } } @media (min-asd: 600px) { view { font-size: 13; } }")]
        public IEnumerator ChangesToMediaParametersAffectStyles()
        {
            yield return null;
            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(Color.white, tmp.color);

            MediaProvider.SetNumber("asd", 600);
            yield return null;
            Assert.AreEqual(Color.red, tmp.color);
            Assert.AreEqual(13, tmp.fontSize);
        }

        [UGUITest(Style = @"
            :root { color-scheme: light dark; }
            view { color: light-dark(white, black); }
        ")]
        public IEnumerator LightDarkFollowsThePreferredScheme()
        {
            yield return null;
            var view = Q("view");

            MediaProvider.SetValue("prefers-color-scheme", "dark");
            yield return null;
            Assert.AreEqual(Color.black, view.ComputedStyle.color);

            MediaProvider.SetValue("prefers-color-scheme", "light");
            yield return null;
            Assert.AreEqual(Color.white, view.ComputedStyle.color);

            // A single scheme on an ancestor decides for its subtree, whatever is preferred.
            Host.Style["color-scheme"] = "dark";
            yield return null;
            Assert.AreEqual(Color.black, view.ComputedStyle.color);
        }

        [UGUITest(Style = @"
            :root { color-scheme: dark; }
            view { color: light-dark(white, black); }
        ")]
        public IEnumerator ColorSchemeOnTheRootSeedsThePreferredScheme()
        {
            yield return null;
            var view = Q("view");
            Assert.AreEqual("dark", MediaProvider.GetValue("prefers-color-scheme"));
            Assert.AreEqual(Color.black, view.ComputedStyle.color);
            Assert.True(Context.MediaProvider != null && Styling.Rules.MediaQueryList.Create(MediaProvider, "(prefers-color-scheme: dark)").matches);

            Host.Style["color-scheme"] = "light";
            yield return null;
            Assert.AreEqual("light", MediaProvider.GetValue("prefers-color-scheme"));
            Assert.AreEqual(Color.white, view.ComputedStyle.color);

            // Handing the choice back leaves the feature with what the platform said.
            Host.Style["color-scheme"] = "light dark";
            yield return null;
            Assert.Contains(MediaProvider.GetValue("prefers-color-scheme"), new[] { "light", "dark" });

            // A value set by hand is never seeded over.
            MediaProvider.SetValue("prefers-color-scheme", "light");
            Host.Style["color-scheme"] = "dark";
            yield return null;
            Assert.AreEqual("light", MediaProvider.GetValue("prefers-color-scheme"));
            Assert.AreEqual(Color.black, view.ComputedStyle.color);
        }

        [UGUITest(Style = @"
            @custom-media --wide (min-asd: 600px);
            @custom-media --always true;
            @custom-media --loop-a (--loop-b);
            @custom-media --loop-b (--loop-a);

            view { color: white; font-size: 7; }
            @media (--wide) { view { color: red; } }
            @media (--always) and (--wide) { view { font-size: 13; } }
            @media (--late) { view { font-size: 21; } }
            @media (--loop-a) { view { color: blue; } }
        ")]
        public IEnumerator CustomMediaNamesStandForTheirQueries()
        {
            yield return null;
            var view = Q("view");
            Assert.AreEqual(Color.white, view.ComputedStyle.color);
            Assert.AreEqual(7, view.ComputedStyle.fontSize);

            MediaProvider.SetNumber("asd", 600);
            yield return null;
            Assert.AreEqual(Color.red, view.ComputedStyle.color);
            Assert.AreEqual(13, view.ComputedStyle.fontSize);

            // A name is looked up when the query is evaluated, so a sheet defining it can come later, and go again.
            var late = InsertStyle("@custom-media --late true;");
            yield return null;
            Assert.AreEqual(21, view.ComputedStyle.fontSize);

            Context.RemoveStyle(late);
            yield return null;
            Assert.AreEqual(13, view.ComputedStyle.fontSize);
        }
    }
}
