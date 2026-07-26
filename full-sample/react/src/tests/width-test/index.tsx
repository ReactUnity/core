import { render } from '@reactunity/renderer';
import './index.scss';

function App() {
  return (<div className="black-bar">
    <div className="content">
      <h1 className="title">Title</h1>
      <div className="gradient-rule" style={{ backgroundColor: 'blue' }}></div>
      <p className="message">Message text goes here</p>
    </div>
  </div>);
}

render(<App />);
