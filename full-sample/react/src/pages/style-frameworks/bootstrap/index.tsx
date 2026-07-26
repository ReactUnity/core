import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './index.scss';

export function BootstrapPage() {
  useEffect(() => {
    // This causes too much performance issues, so load individual scss files
    // @ts-ignore
    // import('bootstrap/dist/css/bootstrap.min.css');
  }, []);

  return <>
    <div>
      <Button size='lg' variant='success'>Success Button</Button>
      <Button size='lg' variant='warning'>Warning Button</Button>

      <div className="card" style="width: 18rem;">
        <image className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </>;
}

export default BootstrapPage;
