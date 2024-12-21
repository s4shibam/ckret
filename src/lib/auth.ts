import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
    }),
    CredentialsProvider({
      name: 'Anonymous',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(
        credentials: Record<'username' | 'password', string> | undefined
      ): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required')
        }

        try {
          const response = await ckretConnect.post(
            '/user/auth/anonymous-signin',
            {
              username: credentials.username,
              password: credentials.password
            }
          )

          console.log('response: ', response)

          if (response?.data) {
            const userData = response.data
            return {
              id: userData._id,
              name: userData.name,
              email: userData.email,
              token: userData.token,
              auth_provider: userData.auth_provider,
              message_max_length: userData.message_max_length,
              feedback_message: userData.feedback_message,
              inbox_max_size: userData.inbox_max_size,
              sketch_max_size: userData.sketch_max_size,
              is_inbox_enabled: userData.is_inbox_enabled,
              username: userData.username
            } as User
          }
          return null
        } catch (error) {
          console.error('Anonymous signin error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const payload = {
          token: account.id_token
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
            user.sketch_max_size = data.sketch_max_size
            user.username = data.username

            return true
          }
        } catch (error: any) {
          console.error('Signin Error: ', error)
        }
      }
      if (account?.provider === 'credentials') {
        return true
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
