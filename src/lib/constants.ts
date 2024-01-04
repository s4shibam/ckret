import {
  MessageCircleQuestion,
  MessageSquareQuote,
  Lightbulb,
  Swords,
  Activity,
  Briefcase,
  ThumbsUp,
  Users,
  HeartHandshake,
  School,
  Wifi,
  Flag,
  UserRoundPlus,
  Cable,
  MessageCircle
} from 'lucide-react'

// URLs
export const CKRET_URL = process.env.NEXT_PUBLIC_CKRET_URL

export const DEVELOPER_PORTFOLIO_URL =
  process.env.NEXT_PUBLIC_DEVELOPER_PORTFOLIO_URL

export const FEEDBACK_FORM_URL = process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL

export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL

// Others
export const CHAR_SIZE_LIMIT = {
  USERNAME: {
    MAX: 20,
    MIN: 5
  },
  FEEDBACK_MESSAGE: {
    MAX: 100,
    MIN: 1
  },
  NAME: {
    MAX: 100,
    MIN: 1
  }
}

export const MESSAGE_INSTRUCTION = {
  AM: 'Send Me Anonymous Messages'
}

// Features
export const FEATURE_HEADING =
  'Ckret is a popular anonymous messaging platform for the next generation.'

export const FEATURE_SUB_HEADING = 'Believe us, it will be fun!'

export const MESSAGE_TYPES_HEADING = 'Send and Receive'

export const RECIPIENT_TYPES_HEADING = 'Share with Your'

export const MESSAGE_TYPES = [
  { Icon: MessageCircleQuestion, title: 'questions' },
  { Icon: Lightbulb, title: 'suggestions' },
  { Icon: MessageSquareQuote, title: 'feedback' },
  { Icon: ThumbsUp, title: 'compliments' },
  { Icon: Activity, title: 'dares' },
  { Icon: Swords, title: 'challenges' }
]

export const RECIPIENT_TYPES = [
  { Icon: HeartHandshake, title: 'families' },
  { Icon: School, title: 'classmates' },
  { Icon: Users, title: 'friends' },
  { Icon: Wifi, title: 'neighbors' },
  { Icon: Flag, title: 'fans & followers' },
  { Icon: Briefcase, title: 'coworkers' }
]

// Guide
export const GUIDE_HEADING = 'How To Use Ckret?'

export const GUIDE_NOTE =
  'There is no need to create an account to send anonymous messages via any link!'

export const GUIDE_STEPS = [
  {
    id: 1,
    Icon: UserRoundPlus,
    heading: 'Create Ckret Account',
    description:
      'Sign up for an account using your Gmail address to get started.'
  },
  {
    id: 2,
    Icon: Cable,
    heading: 'Claim Your Personalized Link',
    description:
      'Create a unique and personalized link that you can share with others.'
  },
  {
    id: 3,
    Icon: MessageCircle,
    heading: 'Receive Anonymous Messages',
    description:
      'Start receiving anonymous messages from others through your personalized link.'
  }
]

// Call to Action
export const CTA_HEADING = {
  authenticated: 'Great to see you again!',
  unauthenticated: 'What are you still waiting for?'
}

export const CTA_SUB_HEADING = {
  authenticated: 'Your dashboard is calling - check the unread messages.',
  unauthenticated: "Let's start your anonymous journey."
}

// FAQs
export const FAQS = [
  {
    question: 'What is Ckret?',
    answer:
      "<span class='font-medium'>Ckret</span> <em>(pronounced <span class='font-medium'>secret</span>)</em> allows you to receive anonymous messages from your friends, families, co-workers, fans and many more. Use it for fun or discover your strengths and areas for improvement by getting feedback from everyone."
  },
  {
    question: 'Who developed Ckret?',
    answer: `<span class='font-medium'>Ckret</span> was developed by <span class='font-medium'>Shibam</span>, a Software Engineer from <span class='font-medium'>India</span>. Know more about him from his <a target='_blank' href='${DEVELOPER_PORTFOLIO_URL}' class='text-blue-500 font-medium'>Portfolio Website</a>.`
  },
  {
    question: 'Why use Ckret?',
    answer:
      "<span class='font-medium'>Ckret</span> is an anonymous messaging platform with a lots of unique features. Explore its capabilities by giving it a try. We are sure, you will not regret it."
  },
  {
    question: 'How can I create my account on Ckret?',
    answer: `Visit the website (<a href='${CKRET_URL}' class='text-blue-500'>${CKRET_URL}</a>), sign in with your <span class='font-medium'>Google</span> account. Your account is now created, and an auto-generated link is assigned exclusively to you. Share the link with those you want to receive messages from.`
  },
  {
    question: 'Can I have multiple accounts on Ckret?',
    answer:
      "<span class='font-medium'>Yes</span>, you can have multiple accounts on Ckret, but you can create an account only once with a specific <span class='font-medium'>Gmail Address</span>. You can use multiple gmail addresses to create multiple accounts. But it is not a recommended way."
  },
  {
    question: 'I forgot my account details, how can I recover them?',
    answer:
      "Currently, we only support <span class='font-medium'>Google Sign In</span>. If you remember the Gmail Address used to create your account, log in to that account in any browser and then sign in to <span class='font-medium'>Ckret</span> using those credentials.<br/>If you've completely forgotten your Gmail credentials, unfortunately, you can't recover your Ckret account associated with that. However, you can always create a new account on Ckret."
  },
  {
    question: 'Where can I find my Ckret Link?',
    answer: `Navigate to the <span class='font-medium'>My Link</span> page (<a href='${CKRET_URL}/dashboard/my-link' class='text-blue-500'>${CKRET_URL}/dashboard/my-link</a>) to find your <span class='font-medium'>Ckret Link</span>.`
  },
  {
    question: 'Can I change my Ckret Link?',
    answer: `<span class='font-medium'>Yes</span>, you can. Go to the <span class='font-medium'>Profile</span> page (<a href='${CKRET_URL}/dashboard/profile' class='text-blue-500'>${CKRET_URL}/dashboard/profile</a>) and change your username of choice. Your new username will serve as your link, like this - <code><strong>${CKRET_URL}/cl/username</strong></code>.`
  },
  {
    question: 'Whom can I share my Ckret Link with?',
    answer:
      "Share your <span class='font-medium'>Ckret Link</span> with anyone you want to use it, such as family, friends, fans, coworkers, etc."
  },
  {
    question: 'Can I know who messaged me?',
    answer:
      "If you're using an anonymous messaging service, understand that user identities are not stored. Therefore, there is no way to determine who sent you the messages."
  },
  {
    question:
      'People are sending me messages, but they are not visible on the messages page. What should I do now?',
    answer:
      "Try clicking the <span class='font-medium'>Refresh</span> button or manually reload the messages page to fetch new messages. Hope your internet is on."
  },
  {
    question:
      'Someone is abusing or insulting me. How can I find out who they are?',
    answer:
      "We recommend sharing your personalized link with people you trust. If someone is bothering you with insults, change your <span class='font-medium'>Ckret Link</span> or <span class='font-medium'>Log Out</span> of your account and stop using our service.<br/>Unfortunately, there's no way for us to identify the sender of abusive messages. We understand your concern, but that's how our website operates. Good luck."
  },
  {
    question: 'How can I restore deleted messages?',
    answer:
      "<span class='font-medium'>Sorry</span>, once you delete a message, it's permanently deleted from our servers. Therefore, you cannot restore deleted messages. Think twice before deleting any message."
  },
  {
    question: 'How can I temporarily stop receiving messages?',
    answer: `Go to the <span class='font-medium'>Settings</span> page (<a href='${CKRET_URL}/dashboard/settings' class='text-blue-500'>${CKRET_URL}/dashboard/settings</a>), where you'll find an option called <span class='font-medium'>Inbox Status</span>. <span class='font-medium'>Enable or Disable</span> it as per your preference.<br/>Disabling the inbox status won't affect your account, but no one will be able to send you messages via your <span class='font-medium'>Ckret Link</span> until you re-enable the inbox status.<br/>Keep in mind that your <span class='font-medium'>Ckret Link</span> won't work when the inbox status is disabled.`
  },
  {
    question:
      'I have feedback for the developers. How can I reach out to them?',
    answer: `It's great that you want to share your feedback with us.<br/>Visit the <span class='font-medium'>Profile</span> page (<a href='${CKRET_URL}/dashboard/profile' class='text-blue-500'>${CKRET_URL}/dashboard/profile</a>), where you'll find a <span class='font-medium'>Share Feedback</span> button. Clicking on it will open a Google form where you can share your thoughts.`
  }
]
