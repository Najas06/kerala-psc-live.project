import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function PrivacyPolicyPage() {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto px-4 py-10 text-sm sm:text-base leading-7">
          <h1 className="text-3xl font-bold mb-6 text-green-700">
            Privacy Policy
          </h1>

          <p className="mb-4">
            At <strong>Kerala PSC Live</strong>, we are committed to protecting
            the privacy and confidentiality of our users. This Privacy Policy
            outlines how we collect, use, store, and protect your data when you
            use our website and services.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            1. Information We Collect
          </h2>
          <p>
            We collect only the essential data necessary to provide you with
            timely and accurate Kerala PSC job notifications and related
            content. This includes:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Your email address (for subscription and alerts)</li>
            <li>Optional details such as name, if provided through forms</li>
            <li>Basic usage data to improve site performance</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            2. How Your Data is Used
          </h2>
          <p>The information we collect is used solely for the purpose of:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Sending Kerala PSC job alerts and updates</li>
            <li>Notifying you about important application dates and results</li>
            <li>Improving the user experience of our website</li>
            <li>
              Protecting access to the admin dashboard (for authorized users)
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            3. No Data Sharing Policy
          </h2>
          <p>
            We respect your privacy. We do not share, sell, rent, or distribute
            your personal information to any third parties. Your data remains
            strictly confidential within our platform.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            4. Data Storage & Security
          </h2>
          <p>
            All collected data is stored securely using trusted technologies. We
            apply industry-standard practices to prevent unauthorized access,
            modification, or misuse of your information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            5. Authentication and Third-Party Services
          </h2>
          <p>
            Kerala PSC Live may use secure third-party services such as Google
            (via OAuth) to handle user authentication for admin access. These
            providers follow their own privacy and security practices. We do not
            access your passwords or sensitive authentication credentials.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            6. Your Consent
          </h2>
          <p>
            By using our website, subscribing to updates, or interacting with
            our content, you agree to the terms of this Privacy Policy.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            7. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page, and the effective date will be noted
            at the bottom.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-green-600">
            8. Contact Us
          </h2>
          <p>
            If you have any questions, suggestions, or concerns regarding your
            privacy, please feel free to contact us at{" "}
            <a
              href="mailto:keralapsclive@gmail.com"
              className="text-blue-600 underline"
            >
              keralapsclive0612@gmail.com
            </a>
            .
          </p>

          <p className="mt-6 text-xs text-gray-500">Last updated: June 2025</p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
