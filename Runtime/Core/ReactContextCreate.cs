using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.Helpers;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Html;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Scripting.DomProxies;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity
{
    public abstract partial class ReactContext
    {
        protected abstract ITextComponent CreateTextInternal(string text);
        protected abstract IReactComponent CreateDefaultComponentInternal(string tag, string text);
        protected abstract IReactComponent CreateComponentInternal(string tag, string text);
        protected abstract IReactComponent CreatePseudoComponentInternal(string tag);

        public ITextComponent CreateText(string text) => CreateTextInternal(text);
        public IReactComponent CreateDefaultComponent(string tag, string text) => CreateDefaultComponentInternal(tag, text);
        public IReactComponent CreateComponent(string tag, string text) => CreateComponentInternal(tag, text);
        public IReactComponent CreatePseudoComponent(string tag) => CreatePseudoComponentInternal(tag);
    }
}
