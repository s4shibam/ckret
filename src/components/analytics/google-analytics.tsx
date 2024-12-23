import Script from 'next/script'

import { env } from '@lib/env'

const GoogleAnalytics = () => {
  if (env.ga_measurement_id === 'env-not-set') {
    return null
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
      id=${env.ga_measurement_id}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.ga_measurement_id}');
        `
        }}
        id="google-analytics"
      />
    </>
  )
}

export default GoogleAnalytics
