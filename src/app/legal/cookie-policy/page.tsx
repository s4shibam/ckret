import { CKRET_URL, SUPPORT_EMAIL } from '@lib/constants'

const CookiePolicy = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Cookie Policy for Ckret</h1>

      <p>
        This is the Cookie Policy for Ckret, accessible from{' '}
        <a className="text-blue-500" href={CKRET_URL}>
          {CKRET_URL}
        </a>
      </p>

      <p className="mb-4 mt-8 text-2xl font-medium">What Are Cookies</p>

      <p>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or break certain elements of the sites
        functionality.
      </p>

      <p className="mb-4 mt-8 text-2xl font-medium">How We Use Cookies</p>

      <p>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </p>

      <p className="mb-4 mt-8 text-2xl font-medium">Disabling Cookies</p>

      <p>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies.
      </p>
      <p className="mb-4 mt-8 text-2xl font-medium">The Cookies We Set</p>

      <ul className="ml-4 flex list-inside list-disc flex-col gap-4">
        <li>
          <span className="pb-2 pt-4 text-xl font-medium">
            Account related cookies
          </span>
          <p>
            If you create an account with us then we will use cookies for the
            management of the signup process and general administration. These
            cookies will usually be deleted when you log out however in some
            cases they may remain afterwards to remember your site preferences
            when logged out.
          </p>
        </li>

        <li>
          <span className="pb-2 pt-4 text-xl font-medium">
            Login related cookies
          </span>
          <p>
            We use cookies when you are logged in so that we can remember this
            fact. This prevents you from having to log in every single time you
            visit a new page. These cookies are typically removed or cleared
            when you log out to ensure that you can only access restricted
            features and areas when logged in.
          </p>
        </li>

        <li>
          <span className="pb-2 pt-4 text-xl font-medium">
            Forms related cookies
          </span>
          <p>
            When you submit data to through a form such as those found on
            contact pages or comment forms cookies may be set to remember your
            user details for future correspondence.
          </p>
        </li>
      </ul>

      <p className="mb-4 mt-8 text-2xl font-medium">Third Party Cookies</p>

      <p>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </p>

      <ul className="ml-4 mt-4 flex list-inside list-disc flex-col gap-4">
        <li>
          This site uses Google Analytics which is one of the most widespread
          and trusted analytics solution on the web for helping us to understand
          how you use the site and ways that we can improve your experience.
          These cookies may track things such as how long you spend on the site
          and the pages that you visit so we can continue to produce engaging
          content. For more information on Google Analytics cookies, see the
          official Google Analytics page.
        </li>

        <li>
          Third party analytics are used to track and measure usage of this site
          so that we can continue to produce engaging content. These cookies may
          track things such as how long you spend on the site or pages you visit
          which helps us to understand how we can improve the site for you.
        </li>

        <li>
          From time to time we test new features and make subtle changes to the
          way that the site is delivered. When we are still testing new features
          these cookies may be used to ensure that you receive a consistent
          experience whilst on the site whilst ensuring we understand which
          optimizations our users appreciate the most.
        </li>

        <li>
          The Google AdSense service we use to serve advertising uses a
          DoubleClick cookie to serve more relevant ads across the web and limit
          the number of times that a given ad is shown to you. For more
          information on Google AdSense see the official Google AdSense privacy
          FAQ.
        </li>

        <li>
          We use adverts to offset the costs of running this site and provide
          funding for further development. The behavioural advertising cookies
          used by this site are designed to ensure that we provide you with the
          most relevant adverts where possible by anonymously tracking your
          interests and presenting similar things that may be of interest.
        </li>
      </ul>

      <p className="mb-4 mt-8 text-2xl font-medium">More Information</p>

      <p>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you are not sure whether you need
        or not it is usually safer to leave cookies enabled in case it does
        interact with one of the features you use on our site.
      </p>

      <p>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </p>

      <p className="mt-4 text-lg">
        By clicking on this{' '}
        <a className="text-blue-500" href={SUPPORT_EMAIL || '#'}>
          link
        </a>
        .
      </p>
    </div>
  )
}

export default CookiePolicy
