import { Button } from "@reactunity/material/button";
import { Route, Routes, useNavigate } from "react-router";
import { GameplaySettings } from "./gameplay";
import style from './index.module.scss';

export function Settings() {
  const nav = useNavigate();

  return <view className={style.host}>
    <view className={style.sidepanel}>
      <Button variant="text" onClick={() => nav('gameplay')}>Gameplay</Button>
      <Button variant="text" onClick={() => nav('video')}>Video</Button>
      <Button variant="text" onClick={() => nav('audio')}>Audio</Button>
      <Button variant="text" onClick={() => nav('..')}>Back</Button>
    </view>

    <Routes>
      <view className={style.main}>
        <Route path="gameplay" element={<GameplaySettings />} />
      </view>
    </Routes>
  </view>;
}
