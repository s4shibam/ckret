interface IEnv {
  node_env: 'development' | 'production'
  nextauth_secret: string | 'env-not-set'
  nextauth_url: string | 'env-not-set'
  google_client_id: string | 'env-not-set'
  google_client_secret: string | 'env-not-set'
  gtm_id: string | 'env-not-set'
  ga_measurement_id: string | 'env-not-set'
  ckret_connect_url: string | 'env-not-set'
  ckret_url: string | 'env-not-set'
  developer_portfolio_url: string | 'env-not-set'
  feedback_form_url: string | 'env-not-set'
  support_email: string | 'env-not-set'
  occasion_greetings: string | 'env-not-set'
}

export const env: IEnv = {
  node_env: (process.env.NODE_ENV as IEnv['node_env']) || 'development',
  nextauth_secret: process.env.NEXTAUTH_SECRET || 'env-not-set',
  nextauth_url: process.env.NEXTAUTH_URL || 'env-not-set',
  google_client_id: process.env.GOOGLE_CLIENT_ID || 'env-not-set',
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET || 'env-not-set',
  gtm_id: process.env.NEXT_PUBLIC_GTM_ID || 'env-not-set',
  ga_measurement_id: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'env-not-set',
  ckret_connect_url: process.env.NEXT_PUBLIC_CKRET_CONNECT_URL || 'env-not-set',
  ckret_url: process.env.NEXT_PUBLIC_CKRET_URL || 'env-not-set',
  developer_portfolio_url:
    process.env.NEXT_PUBLIC_DEVELOPER_PORTFOLIO_URL || 'env-not-set',
  feedback_form_url: process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL || 'env-not-set',
  support_email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'env-not-set',
  occasion_greetings:
    process.env.NEXT_PUBLIC_OCCASION_GREETINGS || 'env-not-set'
}
