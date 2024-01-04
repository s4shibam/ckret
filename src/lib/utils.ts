import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isInvalidLength = (
  text: string,
  LIMIT: { MAX: number; MIN: number }
) => {
  const trimmedText = text.trim()
  return trimmedText.length < LIMIT.MIN || trimmedText.length > LIMIT.MAX
}
