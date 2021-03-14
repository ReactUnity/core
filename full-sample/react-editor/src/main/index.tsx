import { ReactUnity } from '@reactunity/renderer/editor';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPositionX, selectPositionY, selectZoom, setEndNode, setStartNode } from 'src/store/slices/main';
import { Canvas } from './canvas';
import style from './index.module.scss';

const dd = UnityEditor.DragAndDrop;

export function App() {
  const boxes = [0, 1, 2, 3];
  const im = useRef<ReactUnity.Editor.Components.IMGUIComponent>();
  const dispatch = useDispatch();
  const zoom = useSelector(selectZoom);
  console.log(zoom);

  return <view style={{ flexGrow: 1 }} onDragUpdated={(ev) => {
    const pos = new UnityEngine.Vector2(ev.mousePosition.x, ev.mousePosition.y);
    dispatch(setEndNode(pos));
    im.current?.MarkDirtyRepaint();
  }}
    onDragExited={(ev) => {
      dispatch(setStartNode(null));
      im.current?.MarkDirtyRepaint();
    }}>
    <Canvas ref={im} />

    {boxes.map(b => <Box id={b} key={b} />)}
  </view>;
};

export function Box({ id }: { id: number, key: any }) {
  const posX = useSelector(selectPositionX);
  const posY = useSelector(selectPositionY);

  const dispatch = useDispatch();

  return <view className={style.box} style={{ left: id * 102 + posX, top: id * 42 + posY }}>
    This is a box

    <view className={`${style.handle} handle`} onMouseDown={(ev, sender) => {
      dd.PrepareStartDrag();
      dd.SetGenericData('id', id as any);
      dd.StartDrag('Title');
      const pos = new UnityEngine.Vector2(ev.mousePosition.x, ev.mousePosition.y);
      dispatch(setStartNode(pos));
      dispatch(setEndNode(pos));

      ev.StopPropagation();
      ev.PreventDefault();
    }} onMouseUp={(ev, sender) => {
      sender.ReleaseMouse();
    }} onMouseMove={(ev, sender) => {
      if (sender.HasMouseCapture()) {
        const pos = new UnityEngine.Vector2(ev.mousePosition.x, ev.mousePosition.y);
        dispatch(setEndNode(pos));
      }
    }} onDragUpdated={(ev) => {
      const pos = new UnityEngine.Vector2(ev.mousePosition.x, ev.mousePosition.y);
      dispatch(setEndNode(pos));

      if (dd.GetGenericData('id') === id as any)
        dd.visualMode = UnityEditor.DragAndDropVisualMode.Rejected;
      else dd.visualMode = UnityEditor.DragAndDropVisualMode.Link;
    }} onDragPerform={(ev) => {
      console.log(`Incoming ID ${dd.GetGenericData('id')}. This ID ${id}.`);
      dd.AcceptDrag();
      ev.StopPropagation();
      ev.PreventDefault();
    }} onDragExited={(ev) => {
      if (dd.GetGenericData('id') === id as any) return;
      ev.StopPropagation();
      ev.PreventDefault();
    }} />
  </view>;
}
