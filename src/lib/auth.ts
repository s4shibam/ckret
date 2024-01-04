import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import ckretConnect from './api'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const payload = {
          name: user.name || '',
          email: user.email || ''
        }

        try {
          const response = await ckretConnect.post(
            '/user/auth/google-signin',
            payload
          )

          if (response.data) {
            const { data } = response

            user.token = data.token
            user._id = data._id
            user.name = data.name
            user.email = data.email
            user.auth_provider = data.auth_provider
            user.message_max_length = data.message_max_length
            user.feedback_message = data.feedback_message
            user.inbox_max_size = data.inbox_max_size
            user.is_inbox_enabled = data.is_inbox_enabled
            user.username = data.username

            return true
          }
        } catch (error: any) {
          console.error('Signin Error: ', error)
        }
      }
      return false
    },
    async jwt({ user, token, session, trigger }) {
      if (trigger === 'update' && session) {
        return { ...token, ...user, ...session }
      }

      if (user) {
        return { ...token, ...user }
      }

      return token
    },
    session({ session, token }) {
      session.user = token
      return session
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else {
        return `${baseUrl}/dashboard/profile`
      }
    }
  },
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV !== 'production'
}
