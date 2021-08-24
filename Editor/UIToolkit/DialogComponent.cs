using System;
using ReactUnity.Converters;
using ReactUnity.Editor.Renderer;
using ReactUnity.Styling;
using ReactUnity.Types;
using ReactUnity.UIToolkit;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.UIToolkit
{
    public class DialogComponent : UIToolkitComponent<DialogElement>
    {
        public override string Name
        {
            get => Element.Name;
            set => Element.Name = value;
        }

        public string Title
        {
            get => Element.Title;
            set => Element.Title = value;
        }

        public override VisualElement TargetElement => Element.contentContainer;

        private bool shown;
        public bool Show
        {
            get => shown;
            set
            {
                var previousShown = shown;
                shown = value;
                if (value && !previousShown) ChangeType();
                else if (previousShown) Element.Close();
            }
        }

        private DialogType type;
        public DialogType Type
        {
            get => type;
            set
            {
                var previousType = type;
                type = value;
                if (type != previousType) ChangeType();
            }
        }

        public DialogComponent(EditorContext context, string tag = "dialog") : base(context, tag)
        {
            Element.OnOpen += OnOpen;
            Element.OnClose += OnClose;
            Element.OnSelectionChanged += OnSelectionChange;
            Element.OnFocusChange += OnFocusChange;
            Element.OnVisibilityChange += OnVisibilityChange;
        }

        private void OnVisibilityChange(DialogWindow window, bool visible)
        {
            FireEvent("onVisibilityChange", visible);
        }

        private void OnFocusChange(DialogWindow window, bool focused)
        {
            FireEvent("onFocusChange", focused);
        }

        private void OnSelectionChange(DialogWindow window)
        {
            FireEvent("onSelectionChange", window);
        }

        private void OnClose(DialogWindow window)
        {
            shown = false;
            FireEvent("onClose", window);
        }

        private void OnOpen(DialogWindow window)
        {
            shown = true;
            FireEvent("onOpen", window);
        }

        public void Open() => Show = true;
        public void Close() => Show = false;

        private void ChangeType()
        {
            if (!shown) return;
            Element.Show(Type);
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "show") Show = Convert.ToBoolean(value);
            else if (property == "title") Title = Convert.ToString(value);
            else if (property == "type")
            {
                var cv = AllConverters.Get<DialogType>().Convert(value);
                if (cv is DialogType t) Type = t;
                else Type = default;
            }
            else base.SetProperty(property, value);
        }

        public override void DestroySelf()
        {
            base.DestroySelf();
            Element.Close();
        }
    }

    public enum DialogType
    {
        Default = 0,
        Modal = 1,
        Utility = 2,
        ModalUtility = 3,
        Aux = 4,
        Popup = 5,
        Tab = 6,
    }

    public class DialogWindow : EditorWindow
    {
        public event Action<DialogWindow> OnOpen;
        public event Action<DialogWindow> OnClose;
        public event Action<DialogWindow, bool> OnFocusChange;
        public event Action<DialogWindow> OnSelectionChanged;
        public event Action<DialogWindow, bool> OnVisibilityChange;

        public static DialogWindow Create()
        {
            return CreateWindow<DialogWindow>();
        }

        private void Awake()
        {
            OnOpen?.Invoke(this);
        }

        private void OnDestroy()
        {
            OnClose?.Invoke(this);
        }

        private void OnFocus()
        {
            OnFocusChange?.Invoke(this, true);
        }

        private void OnLostFocus()
        {
            OnFocusChange?.Invoke(this, false);
        }

        private void OnSelectionChange()
        {
            OnSelectionChanged?.Invoke(this);
        }

        protected void OnBecameVisible()
        {
            OnVisibilityChange?.Invoke(this, true);
        }

        protected void OnBecameInvisible()
        {
            OnVisibilityChange?.Invoke(this, false);
        }
    }

    public class DialogElement : VisualElement
    {
        public event Action<DialogWindow> OnOpen;
        public event Action<DialogWindow> OnClose;
        public event Action<DialogWindow, bool> OnFocusChange;
        public event Action<DialogWindow> OnSelectionChanged;
        public event Action<DialogWindow, bool> OnVisibilityChange;

        public DialogWindow Window;

        public override VisualElement contentContainer { get; }

        public string Name
        {
            get => name;
            set
            {
                name = value;
                if (Window != null) Window.name = value;
            }
        }

        private string title;
        public string Title
        {
            get => title;
            set
            {
                title = value;
                if (Window != null) Window.titleContent = new GUIContent(title);
            }
        }

        public DialogElement()
        {
            style.display = DisplayStyle.None;
            contentContainer = new VisualElement();
        }

        private DialogWindow CreateWindow()
        {
            var window = DialogWindow.Create();
            window.name = Name;
            window.titleContent = new GUIContent(title);
            window.rootVisualElement.styleSheets.Add(ResourcesHelper.UtilityStylesheet);
            window.rootVisualElement.Add(contentContainer);
            return window;
        }

        public void Show(DialogType type)
        {
            if (contentContainer.parent != null) contentContainer.RemoveFromHierarchy();
            if (Window == null) Window = CreateWindow();

            switch (type)
            {
                case DialogType.Modal:
                    Window.ShowModal();
                    break;
                case DialogType.Utility:
                    Window.ShowUtility();
                    break;
                case DialogType.ModalUtility:
                    Window.ShowModalUtility();
                    break;
                case DialogType.Aux:
                    Window.ShowAuxWindow();
                    break;
                case DialogType.Popup:
                    Window.ShowPopup();
                    break;
                case DialogType.Tab:
                    Window.ShowTab();
                    break;
                case DialogType.Default:
                default:
                    Window.Show();
                    break;
            }

            Window.OnOpen += (ev) => OnOpen?.Invoke(ev);
            Window.OnClose += (ev) => OnClose?.Invoke(ev);
            Window.OnSelectionChanged += (ev) => OnSelectionChanged?.Invoke(ev);
            Window.OnFocusChange += (ev, val) => OnFocusChange?.Invoke(ev, val);
            Window.OnVisibilityChange += (ev, val) => OnVisibilityChange?.Invoke(ev, val);
        }

        public void Close()
        {
            if (contentContainer.parent != null) contentContainer.RemoveFromHierarchy();
            if (Window != null) Window.Close();
            Window = null;
        }
    }
}
