
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? '';


export function AnalyticsScript() {
  return !GA_TRACKING_ID ? <></> : <>
    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
    <script async defer
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
    <script async defer dangerouslySetInnerHTML={{
      __html:
        `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_TRACKING_ID}');
      `}}
    />
  </>;
}
