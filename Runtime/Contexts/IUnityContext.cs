using Jint.Native;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity
{
    public interface IUnityContext<BaseType, TextType, ContainerType, HostType>
    {
        HostType Host { get; }

        #region Creation

        TextType createText(string text);

        BaseType createElement(string type, string text);

        #endregion


        #region Layout

        void appendChild(ContainerType parent, BaseType child);

        void appendChildToContainer(HostType parent, BaseType child);

        void insertBefore(ContainerType parent, BaseType child, BaseType beforeChild);

        void removeChild(ContainerType parent, BaseType child);

        #endregion


        #region Properties

        void setText(TextType instance, string text);

        void setProperty(BaseType el, string property, JsValue value);

        void setEventListener(BaseType el, string eventType, JsValue value);

        #endregion

        void scheduleLayout();
    }
}
