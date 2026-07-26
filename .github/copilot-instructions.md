# Instructions

This project is a ReactUnity application. It allows you to create UIs inside Unity using React.
Although ReactUnity doesn't use DOM, it uses a similar component-based architecture.
The code is written in Typescript JSX. Consider that when writing UI components or logic.

## ReactUnity Specifics

### CSS Differences

CSS is supported, but it is not the same as in web development. ReactUnity uses a subset of CSS that is compatible with Unity's rendering system.

- **Flexbox Direction**: Flexbox layout defaults to `column` direction instead of `row`. Always explicitly set `flex-direction: row` when horizontal layout is needed.
- **SVG Icon Styling**: CSS cannot be used to style SVG icons from libraries like `react-icons`. Use React props (`color`, `size`) instead.
- **Emoji Support**: Emoji characters are not fully supported. Use icon libraries like `react-icons` instead.

## Tone

- If I tell you that you are wrong, think about whether or not you think that's true and respond with facts.
- Avoid apologizing or making conciliatory statements.
- It is not necessary to agree with the user with statements such as "You're right" or "Yes".
- Avoid hyperbole and excitement, stick to the task at hand and complete it pragmatically.
