import { ReactUnity } from '@reactunity/renderer';
import * as React from 'react';
import { useEffect, useState } from 'react';

type RC = ReactUnity.UGUI.Behaviours.ReactElement;

const Window = Globals.Window;
const Inspector = Globals.Inspector;

function getSelection() {
  if (Window) {
    const activeObject = Interop.UnityEditor.Selection.activeGameObject;
    if (!activeObject) return null;
    return activeObject.GetComponent('ReactElement') as RC;
  }

  if (Inspector) {
    return Inspector.target as RC;
  }

  return null;
}

const ctx = React.createContext<RC>(undefined);

export function SelectionProvider({ children }: { children?: React.ReactNode }) {
  const [selection, setSelection] = useState<RC>(getSelection());

  const updateSelection = () => setSelection(getSelection());

  useEffect(() => {
    if (Window) {
      const removeSelectionChange = Window.AddSelectionChange(updateSelection);
      const removeStateChange = Window.AddPlayModeStateChange(updateSelection);
      const removeVisibilityChange = Window.AddVisibilityChange(updateSelection);
      return () => {
        removeSelectionChange();
        removeStateChange();
        removeVisibilityChange();
      };
    }
  }, []);

  return React.createElement(ctx.Provider, { value: selection }, children);
}

export function useSelection() {
  const context = React.useContext(ctx);
  if (context === undefined) {
    throw new Error('useSelection must be used within a provider');
  }
  return context;
}
