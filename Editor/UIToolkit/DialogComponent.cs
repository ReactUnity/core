using System;
using ReactUnity.Converters;
using ReactUnity.Editor.Renderer;
using ReactUnity.Styling;
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

        public override VisualElement TargetElement => Element.contentContainer;

        public DialogComponent(EditorContext context, string tag = "dialog") : base(context, tag)
        {
            Element.OnOpen += OnOpen;
            Element.OnClose += OnClose;
            Element.OnSelectionChanged += OnSelectionChange;
            Element.OnFocusChange += OnFocusChange;
            Element.OnVisibilityChange += OnVisibilityChange;
        }

        private void OnVisibilityChange(DialogWindow window, bool visible) => FireEvent("onVisibilityChange", visible);
        private void OnFocusChange(DialogWindow window, bool focused) => FireEvent("onFocusChange", focused);
        private void OnSelectionChange(DialogWindow window) => FireEvent("onSelectionChange", window);
        private void OnClose(DialogWindow window) => FireEvent("onClose", window);
        private void OnOpen(DialogWindow window) => FireEvent("onOpen", window);

        public void Open() => Element.Shown = true;
        public void Close() => Element.Shown = false;

        public override void SetProperty(string property, object value)
        {
            if (property == "show") Element.Shown = Convert.ToBoolean(value);
            else if (property == "title") Element.Title = Convert.ToString(value);
            else if (property == "maximized") Element.Maximized = Convert.ToBoolean(value);
            else if (property == "type")
            {
                var cv = AllConverters.Get<DialogType>().Convert(value);
                if (cv is DialogType t) Element.Type = t;
                else Element.Type = default;
            }
            else base.SetProperty(property, value);
        }

        public override void DestroySelf()
        {
            base.DestroySelf();
            Element.Close();
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Element.ResolveStyle(Element.Window);
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
        public static float DefaultMinWidth = 160;
        public static float DefaultMinHeight = 240;
        public static float DefaultMaxWidth = 10000;
        public static float DefaultMaxHeight = 10000;

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

        private bool maximized;
        public bool Maximized
        {
            get => maximized;
            set
            {
                maximized = value;
                if (Window != null) Window.maximized = value;
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

        private bool shown;
        public bool Shown
        {
            get => shown;
            set
            {
                var previousShown = shown;
                shown = value;
                if (value && !previousShown) ChangeType();
                else if (previousShown) Close();
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

        public DialogElement()
        {
            style.display = DisplayStyle.None;
            contentContainer = new VisualElement();
        }

        private DialogWindow CreateWindow()
        {
            var window = DialogWindow.Create();
            window.name = Name;
            window.titleContent = new GUIContent(Title);
            window.maximized = Maximized;
            window.rootVisualElement.styleSheets.Add(ResourcesHelper.UtilityStylesheet);
            window.rootVisualElement.Add(contentContainer);
            ResolveStyle(window);
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

            Window.OnOpen += (ev) => {
                shown = true;
                OnOpen?.Invoke(ev);
            };
            Window.OnClose += (ev) => {
                shown = false;
                OnClose?.Invoke(ev);
            };
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

        private void ChangeType()
        {
            if (!shown) return;
            Show(Type);
        }

        public void ResolveStyle(DialogWindow window)
        {
            if (window == null) return;

            var style = contentContainer.style;
            var width = style.width;
            var height = style.height;
            var hasWidth = width.keyword == StyleKeyword.Undefined && width.value.unit == LengthUnit.Pixel;
            var hasHeight = height.keyword == StyleKeyword.Undefined && height.value.unit == LengthUnit.Pixel;

            if (hasWidth || hasHeight)
            {
                var min = new Vector2(hasWidth ? width.value.value : 0, hasHeight ? height.value.value : 0);
                var max = new Vector2(hasWidth ? width.value.value : float.MaxValue, hasHeight ? height.value.value : float.MaxValue);

                window.minSize = min;
                window.maxSize = max;
            }


            var minw = DefaultMinWidth;
            var minh = DefaultMinHeight;
            var maxw = DefaultMaxWidth;
            var maxh = DefaultMaxHeight;

            if (hasWidth) minw = maxw = width.value.value;
            else
            {
                var minWidth = style.minWidth;
                var hasMinWidth = minWidth.keyword == StyleKeyword.Undefined && minWidth.value.unit == LengthUnit.Pixel;
                if (hasMinWidth) minw = minWidth.value.value;

                var maxWidth = style.maxWidth;
                var hasMaxWidth = maxWidth.keyword == StyleKeyword.Undefined && maxWidth.value.unit == LengthUnit.Pixel;
                if (hasMaxWidth) maxw = maxWidth.value.value;
            }

            if (hasHeight) minh = maxh = height.value.value;
            else
            {
                var minHeight = style.minHeight;
                var hasMinHeight = minHeight.keyword == StyleKeyword.Undefined && minHeight.value.unit == LengthUnit.Pixel;
                if (hasMinHeight) minh = minHeight.value.value;

                var maxHeight = style.maxHeight;
                var hasMaxHeight = maxHeight.keyword == StyleKeyword.Undefined && maxHeight.value.unit == LengthUnit.Pixel;
                if (hasMaxHeight) maxh = maxHeight.value.value;
            }

            window.minSize = new Vector2(minw, minh);
            window.maxSize = new Vector2(maxw, maxh);
            contentContainer.style.width = StyleKeyword.Initial;
            contentContainer.style.height = StyleKeyword.Initial;
            contentContainer.style.minWidth = StyleKeyword.Initial;
            contentContainer.style.minHeight = StyleKeyword.Initial;
            contentContainer.style.maxWidth = StyleKeyword.Initial;
            contentContainer.style.maxHeight = StyleKeyword.Initial;
        }
    }
}
