import * as React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <view
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
