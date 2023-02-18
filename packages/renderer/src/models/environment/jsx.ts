import { Attributes, ClassAttributes } from 'react';

declare global {
  interface ReactUnityCustomAttributes { }

  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends Attributes, ReactUnityCustomAttributes { }
    interface IntrinsicClassAttributes<T> extends ClassAttributes<T> { }
  }
}

declare module 'react' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes, ReactUnityCustomAttributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface ElementAttributesProperty { props: {} }
    interface ElementChildrenAttribute { children: {} }
    interface IntrinsicAttributes extends React.Attributes, ReactUnityCustomAttributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
  }
}
