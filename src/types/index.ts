import { DefaultUser } from 'next-auth'

export type TUser = DefaultUser & {
  _id: string
  auth_provider: string
  message_max_length: number
  feedback_message: string
  inbox_max_size: number
  sketch_max_size: number
  is_inbox_enabled: boolean
  name: string
  username: string
  avatar: string
  token: string
}

export type TMessage = {
  _id: string
  content: string
  reply?: string
  show_in_profile?: boolean
  createdAt: string
  updatedAt: string
}

export type TSketch = {
  _id: string
  recipient: string
  sketch_url: string
  reply?: string
  show_in_profile?: boolean
  createdAt: string
}

export type TStorageStatus = 'full' | 'almost_full' | 'ok' | 'empty'
