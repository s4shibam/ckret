import { TUser } from '.'

declare module 'next-auth' {
  interface User extends TUser {}
  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends TUser {}
}
