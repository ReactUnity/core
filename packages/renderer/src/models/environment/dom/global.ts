import { ReactUnity } from '../../generated';
import { FormData as TFormData, URL as TURL } from './common';
import { fetch as Tfetch } from './fetch';
import { XMLHttpRequest as TXHR } from './xhr';

declare global {
  var FormData: typeof TFormData;
  var URL: typeof TURL;
  var fetch: typeof Tfetch;
  var XMLHttpRequest: typeof TXHR;
  var WebSocket: ReactUnity.Scripting.DomProxies.WebSocketProxy;
  var performance: { now: () => number } | undefined;
}
