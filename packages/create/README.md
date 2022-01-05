# Create React Unity App

Creates the Typescript project for React Unity. See [core library](https://github.com/ReactUnity/core) for details.

## Usage

If you want to add ReactUnity to an existing Unity project:

`npx @reactunity/create`

If you want to create full Unity app from scratch:

`npx @reactunity/create -u`

Create the React project in a custom folder:

`npx @reactunity/create custom/folder/path`

### Options

Options can be used like: `npx @reactunity/create <options>`

```
  -u, --unity                Creates Unity project from scratch and adds React project into it
  -i, --install [npm|yarn]   Run 'npm install' or 'yarn install'.
  -h, --help                 Print help
```

## Commands

After a project is created, you can run following commands in the `react` directory. You can also use other package managers like `yarn` instead of `npm`.

- `npm start` - Run development server with HMR support
- `npm run build` - Build the production ready Javascript file to `/Assets/Resources/react/index.js`
