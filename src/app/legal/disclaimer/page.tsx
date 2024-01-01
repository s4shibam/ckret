import { CKRET_URL, SUPPORT_EMAIL } from '@lib/constants'

const Disclaimer = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Disclaimer for Ckret</h1>
      <p>
        This is the Disclaimer for Ckret, accessible from{' '}
        <a className="text-blue-500" href={CKRET_URL}>
          {CKRET_URL}
        </a>
      </p>
      <p className="mb-4 mt-8">
        All information on this website -{' '}
        <a className="text-blue-500" href={CKRET_URL}>
          {CKRET_URL}
        </a>{' '}
        - is provided in good faith and is intended solely for general
        information purposes.
      </p>
      <p className="mb-4 mt-8">
        <span className="font-medium">{CKRET_URL}</span> makes no guarantees on
        the completeness, dependability, or correctness of this material. Any
        action you take in response to the material on this website is entirely
        at your own risk. <span className="font-medium">{CKRET_URL}</span> shall
        not be liable for any losses or damages incurred as a result of using
        our website. Please do not use this website to propagate hatred or
        disgust others.
      </p>
      <p className="mb-4 mt-8">
        If you sign in or use our platform in any way, we expect you to be
        familiar with the platform policies and disclaimer. We anticipate that
        you will follow them. The following are the minimal terms and conditions
        for utilizing these platforms:
      </p>

      <ul className="ml-4 mt-4 list-inside list-disc">
        <li>You will not to spam messages.</li>
        <li>
          You are not going to create any threats or send any harmful
          communications.
        </li>
        <li>
          You promise not to use this platform for any unethical or
          anti-national activity.
        </li>
        <li>You don&apos;t intend to share any NSFW content here.</li>

        <li>
          <span className="font-medium">{CKRET_URL}</span> shall not be
          accountable for any losses or damages incurred as a result of using
          our website.
        </li>
      </ul>

      <p className="mb-4 mt-8">
        You can access other websites by following hyperlinks to such external
        sites from our website. While we make every effort to provide only
        high-quality links to useful and ethical websites, we have no control
        over the content or character of these websites. These connections to
        other websites do not constitute endorsement of the information on other
        sites. Site owners and content may change without warning, and this may
        occur before we have the opportunity to delete a &apos;bad&apos; link.
      </p>

      <p className="mb-4 mt-8">
        Please be aware that when you leave our website, other sites&apos;
        privacy policies and conditions may change, which is beyond our control.
        Please review these sites&apos; Privacy Policies as well as their
        &quot;Terms of Service&quot; before conducting any business or posting
        any information.
      </p>

      <p className="mb-4 mt-8">
        If you require any further information or have any questions about the
        website&apos;s disclaimer, please contact us by email at{' '}
        <a
          className="text-blue-500"
          href={'mailto:' + SUPPORT_EMAIL}
          target="_blank"
        >
          {SUPPORT_EMAIL}.
        </a>
      </p>
    </div>
  )
}

export default Disclaimer
