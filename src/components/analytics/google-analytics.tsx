import Script from 'next/script'

import { GA_MEASUREMENT_ID } from '@lib/constants'

const GoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
      id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `
        }}
        id="google-analytics"
      />
    </>
  )
}

export default GoogleAnalytics
