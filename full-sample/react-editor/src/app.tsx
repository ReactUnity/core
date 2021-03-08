import { ReactUnity, Renderer } from '@reactunity/renderer/editor';
import { useMemo, useRef } from 'react';
import style from './index.module.scss';

const dd = UnityEditor.DragAndDrop;

let startPos = UnityEngine.Vector3.zero;
let curPos = UnityEngine.Vector3.zero;

export function App() {
  const ongui = useMemo(() => {

    return () => {

      var y = im.current.Element.worldBound.yMin;
      var st = new UnityEngine.Vector3(startPos.x, startPos.y - y, 0);
      var en = new UnityEngine.Vector3(curPos.x, curPos.y - y, 0);

      var tanDist = new UnityEngine.Vector3(st.x - en.x, st.y - en.y, 0).magnitude / 2;

      var stan = new UnityEngine.Vector3(st.x + tanDist, st.y, 0);
      var etan = new UnityEngine.Vector3(en.x + tanDist, en.y, 0);

      UnityEditor.Handles.DrawBezier(st, en, stan, etan, UnityEngine.Color.yellow, null, 4);
    };
  }, []);

  const boxes = [0, 1, 2, 3];

  const im = useRef<ReactUnity.Editor.Renderer.Components.EditorIMGUIComponent>();

  return <view style={{ flexGrow: 1 }} onDragUpdated={(ev) => {
    curPos = new UnityEngine.Vector3(ev.mousePosition.x, ev.mousePosition.y, 0);
    im.current?.MarkDirtyRepaint();
  }}>
    <imgui onGUI={ongui} className={style.canvas} ref={im} />

    {boxes.map(b => <Box id={b} key={b} />)}
  </view>;
};

export function Box({ id }: { id: number, key: any }) {
  return <view className={style.box} style={{ left: id * 102, top: id * 42 }}>
    This is a box

    <view className={`${style.handle} handle`} onPointerDown={(ev, sender) => {
      dd.PrepareStartDrag();
      dd.SetGenericData('id', id as any);
      dd.StartDrag('Title');
      curPos = startPos = new UnityEngine.Vector3(ev.position.x, ev.position.y, 0);
    }} onMouseUp={(ev, sender) => {
      sender.ReleaseMouse();
    }} onMouseMove={(ev, sender) => {
      if (sender.HasMouseCapture()) {
        curPos = new UnityEngine.Vector3(ev.mousePosition.x, ev.mousePosition.y, 0);
      }
    }} onDragUpdated={(ev) => {
      curPos = new UnityEngine.Vector3(ev.mousePosition.x, ev.mousePosition.y, 0);
      if (dd.GetGenericData('id') === id as any)
        dd.visualMode = UnityEditor.DragAndDropVisualMode.Rejected;
      else dd.visualMode = UnityEditor.DragAndDropVisualMode.Link;
    }} onDragPerform={() => {
      console.log(`Incoming ID ${dd.GetGenericData('id')}. This ID ${id}.`);
      dd.AcceptDrag();
    }} />
  </view>;
}


Renderer.render(<App />);
