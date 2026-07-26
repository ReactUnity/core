---
title: Troubleshooting
---

If you are running into an issue, this section will help you resolve it. Here are some common issues and their solutions.


## UI isn't working after build

If UI is working correctly in Editor, but it is not working after you build the application and try to run it in your target platform, this can be caused by one of the following:

#### You forgot to build UI code

You must build your React project to a single `.js` file for it to work in built project. Make sure to run `npm run build` in your React project. It will report the path to the generated files. Then go to Unity Editor and make sure the `ReactRenderer` component is referencing that file correctly.

#### You have an error in your code

Sometimes there are errors that don't happen in Editor, but happens when you are testing in the target platform. Please check the error logs to see if you have an error, and if it's related to ReactUnity, report it as a bug.

#### Issues caused by Code stripping

When building with IL2CPP, Unity will strip out unused code to make the build size smaller and faster. And because ReactUnity uses reflection to reach code, Unity cannot detect that code and will strip it away as well. You can read more about code stripping [here](https://docs.unity3d.com/Manual/ManagedCodeStripping.html).

The easy way to solve this is adding Preserve attribute to methods you use in your code:

```cs
[UnityEngine.Scripting.Preserve]
public void MyCode() {
...
}
```

Another way is to add `[assembly: UnityEngine.Scripting.Preserve]` to anywhere in your code to prevent stripping in all of that assembly.

Unity can also strip unused engine code, but that code may be used by ReactUnity. The way to prevent that is by using a `link.xml` file. For example, you may use this `link.xml`file if you are using a VideoPlayer component:

```xml
<linker>
  <assembly fullname="UnityEngine.VideoModule">
    <type fullname="UnityEngine.Video.VideoPlayer" preserve="all"/>
  </assembly>

  <assembly fullname="Assembly-CSharp"/>

  <assembly fullname="ReactUnity"/>
</linker>
```

#### It doesn't work in Android when minify is enabled

A `Custom Proguard File` must be created in the Project settings and add this code must be added:

```
-keep class com.facebook.yoga.** { *; }
```

See [this issue](https://github.com/ReactUnity/core/issues/111) for details.

