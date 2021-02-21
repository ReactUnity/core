# Create React Unity App

Creates the Typescript project for React Unity. See [core library](https://github.com/ReactUnity/core) for details.

## Usage

If you want to add ReactUnity to an existing Unity project:

`npm init @reactunity`

If you want to create full Unity app from scratch:

`npm init @reactunity -u`

Create the React project in a custom folder:

`npm init @reactunity custom/folder/path`

#### Options:

```
  -s, --skip-install       Skips 'npm install'
  -u, --unity              Creates Unity project from scratch and adds React project into it
  -e, --editor             Create React Unity Editor project
```

## Commands

After a project is created, following commands can be run in the `react` directory.

- `npm start` - Run development server with HMR support
- `npm run build` - Build the production ready Javascript file to `/Assets/Resources/react/index.js`
