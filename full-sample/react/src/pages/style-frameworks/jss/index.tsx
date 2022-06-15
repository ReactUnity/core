import { useState } from 'react';
import { createUseStyles } from 'react-jss';

export function JSSPage() {
  return <>
    <div>
      <Button>JSS Button</Button>
    </div>
  </>;
}

export default JSSPage;


// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles(({
  '@keyframes rotate': {
    from: {
      transform: 'scale(1)',
    },
    to: {
      transform: 'scale(1.5)',
    }
  },
  myButton: ({
    color: (prop: any) => prop.enabled ? 'green' : 'red',
    // color: 'green',
    margin: {
      // jss-plugin-expand gives more readable syntax
      top: 5, // jss-plugin-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    animation: '$rotate 1s infinite alternate',
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold' // jss-plugin-camel-case turns this into 'font-weight'
    }
  }),
  myLabel: {
    fontStyle: 'italic',
  },
  '@media (max-width: 600px)': {
    myButton: {
      backgroundColor: 'yellow'
    },
  },
}));

// Define the component using these styles and pass it the 'classes' prop.
// Use this to assign scoped class names.
const Button = ({ children }) => {
  const [enabled, setEnabled] = useState(true);
  const classes = useStyles({ enabled } as any)
  return (
    <button className={classes.myButton} onClick={() => setEnabled(x => !x)}>
      <span className={classes.myLabel}>{children}</span>
    </button>
  )
}
