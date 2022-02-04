import { useNavigate } from "react-router";

export function MainMenu() {
  const nav = useNavigate();

  return <view>
    <button>
      Play
    </button>

    <button onClick={() => nav('/settings')}>
      Settings
    </button>

    <button onClick={() => Interop.UnityEngine.Application.Quit()}>
      Quit
    </button>
  </view>;
}
