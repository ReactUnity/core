// Entry point of the bundle the Unity test runner evaluates inside QuickJS.
// Sucrase goes on globalThis because CodeTransformer runs this as a plain script and
// then calls `Sucrase.transform(...)` by name; the options stay on the C# side.
const { transform } = require('sucrase');

globalThis.Sucrase = { transform };
