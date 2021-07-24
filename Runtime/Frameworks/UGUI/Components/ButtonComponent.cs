using ReactUnity.Helpers;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{

    public class ButtonComponent : UGUIComponent
    {
        public Button Button { get; private set; }

        public ButtonComponent(UGUIContext context) : base(context, "button")
        {
            Button = AddComponent<Button>();
        }


        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onClick":
                    Button.onClick.RemoveAllListeners();
                    if (callback != null) Button.onClick.AddListener(new UnityAction(() => callback.Call(this)));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }
    }
}
