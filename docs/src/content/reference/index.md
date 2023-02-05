---
title: ReactUnity APIs
layout: API
---

<Intro>

ReactUnity works with a collection of packages on the Javascript side. These are `@reactunity/renderer` and `@reactunity/scripts`.

</Intro>

## Renderer

`@reactunity/renderer` is an npm package that handles the rendering login of the React virtual DOM. Without going into details, it is much alike `react-dom` in what it does.

```js
import { Renderer } from '@reactunity/renderer';

Renderer.render(<view>Hello world!</view>)
```

In addition to its rendering functionality, it also includes Typescript types and utilities to improve development experience.

## Scripts

`@reactunity/scripts` is the collection of npm scripts and Webpack configuration that can be used to easily build and run ReactUnity projects. It is an npm package and it should be included in `devDependencies`.

### Starting

<TerminalBlock>

react-unity-scripts start

</TerminalBlock>

Starts the Webpack Dev Server with Fast Refresh configuration.


### Building

<TerminalBlock>

react-unity-scripts build

</TerminalBlock>

Builds the project into statical files to be production-ready.
