import { shallowDiffers } from './shallowDiffers';

// Custom comparison function for React.memo().
// It knows to compare individual style props and ignore the wrapper object.
// See https://reactjs.org/docs/react-api.html#reactmemo
export function areEqual(
  prevProps: any,
  nextProps: any
): boolean {
  const { style: prevStyle, ...prevRest } = prevProps;
  const { style: nextStyle, ...nextRest } = nextProps;

  return (
    !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest)
  );
}
