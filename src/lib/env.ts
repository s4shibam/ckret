interface IEnv {
  node_env: 'development' | 'production'
  nextauth_secret: string
  nextauth_url: string
  google_client_id: string
  google_client_secret: string
  gtm_id: string
  ga_measurement_id: string
  ckret_connect_url: string
  ckret_url: string
  developer_portfolio_url: string
  feedback_form_url: string
  support_email: string
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
  support_email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'env-not-set'
}
