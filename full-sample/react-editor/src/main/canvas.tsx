import { ReactUnity, UnityEngine as UE } from '@reactunity/renderer/editor';
import { forwardRef, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDragManipulator } from 'src/drag-hook';
import { useCombinedRefs } from 'src/hooks/combined-ref';
import { store } from 'src/store';
import { addPosition, addZoom } from 'src/store/slices/main';
import style from './index.module.scss';

type Cmp = ReactUnity.Editor.Renderer.Components.EditorIMGUIComponent;

export const Canvas = forwardRef<Cmp>(
  function Canvas(props, ref) {
    const [im, setIm] = useState<Cmp>();
    const combinedRef = useCombinedRefs(setIm, ref);

    const ongui = useMemo(() => {

      return (target: Cmp) => {

        const [sx, sy] = store.getState().main.startNode || [];
        const [ex, ey] = store.getState().main.endNode || [];

        if (sx == null || ex == null) return;
        const y = target.Element.worldBound.yMin;
        const st = new UnityEngine.Vector3(sx, sy - y, 0);
        const en = new UnityEngine.Vector3(ex, ey - y, 0);

        const tanDist = new UnityEngine.Vector3(st.x - en.x, st.y - en.y, 0).magnitude / 2;

        const stan = new UnityEngine.Vector3(st.x + tanDist, st.y, 0);
        const etan = new UnityEngine.Vector3(en.x + tanDist, en.y, 0);

        UnityEditor.Handles.DrawBezier(st, en, stan, etan, UnityEngine.Color.yellow, null, 4);
      };
    }, []);

    const dispatch = useDispatch();
    useDragManipulator(im, null, (ev) => {
      dispatch(addPosition(ev.mouseDelta));
    });

    const wheel = (ev: UE.UIElements.WheelEvent) => {
      dispatch(addZoom(-ev.delta.y / 10));
    };

    return <imgui onGUI={ongui} className={style.canvas} ref={combinedRef} onWheel={wheel} />;
  });
