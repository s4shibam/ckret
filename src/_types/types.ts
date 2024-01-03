import { DefaultUser } from 'next-auth'

export interface IUser extends DefaultUser {
  _id: string
  auth_provider: string
  message_max_length: number
  feedback_message: string
  inbox_max_size: number
  is_inbox_enabled: boolean
  username: string
  token: string
}

export interface IMessage {
  _id: string
  content: string
  createdAt: string
}
