import { render } from '@reactunity/renderer';
import React, { useState } from 'react';

function ErrorChild2() {
  const [state, setState] = useState(null);

  return <div class="error-child-2">
    {state.value}
  </div>;
}

function ErrorChild1() {
  return <div class="error-child-1">
    <ErrorChild2 />
  </div>;
}

export default function ErrorTest() {

  return (
    <ErrorChild1 />
  );
}


const createdRefs = new Set();

function createRef(ref) {
  if (ref && !createdRefs.has(ref)) {
    createdRefs.add(ref);
    console.log('Created ref', ref);
  }
}

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <view ref={createRef}
        id='__react-unity-error-boundary'
        style={{ color: 'crimson', padding: 20, fontSize: 16 }}>
        <view style={{ marginBottom: '12px' }}>
          {this.state.error?.message || ''}
        </view>
        <view>{this.state.error?.stack || ''}</view>
      </view>;
    }

    return this.props.children;
  }
}

render(
  <ErrorBoundary>
    <ErrorTest />
  </ErrorBoundary>, { disableHelpers: true });
