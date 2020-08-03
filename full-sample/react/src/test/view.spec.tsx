// import { App } from 'src/wiki/view';
import { testRender } from 'react-unity-renderer';
import * as React from 'react';

describe('Sample Test', () => {
  it('should pass', async () => {
    const cmp = await testRender(<view><view className='hello'>MyTestContent</view> OtherTestContent</view>);
    expect(cmp.QuerySelector(':scope > view > .hello').TextContent).to.equal('MyTestContent');
    expect(cmp.QuerySelector('view').TextContent).to.equal('MyTestContent OtherTestContent');
    expect(cmp.QuerySelector(':scope > view').TextContent).to.equal('MyTestContent OtherTestContent');
  });
});
