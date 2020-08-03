import { App } from 'src/wiki/view';

describe('Sample Test', () => {
  it('should pass', async () => {
    const res = await (new Promise(resolve => setTimeout(() => resolve(5), 400)));
    expect(res).to.equal(5);
    expect(App).to.be.a('function');
  });
});
