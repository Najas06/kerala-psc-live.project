export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-sm sm:text-base leading-7">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Contact Us</h1>

      <p className="mb-6 text-gray-700">
        Have a question, feedback, or a correction about a Kerala PSC job post?
        We’re here to help you. Our mission is to deliver accurate and timely PSC
        job updates to every job seeker across Kerala.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-green-600">📧 Email Support</h2>
          <p>
            For general inquiries, corrections, or collaboration opportunities, reach out
            to us at:
            <br />
            <a
              href="mailto:keralapsclive@gmail.com"
              className="text-blue-600 underline"
            >
              keralapsclive0612@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-600">📣 Suggestions & Feedback</h2>
          <p>
            Your feedback helps us improve. If you spot an outdated job post or want
            additional features on this site, don’t hesitate to get in touch. We aim to
            respond within 24–48 hours.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-600">🔐 Privacy Respect</h2>
          <p>
            We respect your privacy. Your email and messages will never be shared or used
            for anything outside of Kerala PSC Live communication.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-sm text-gray-500">
        <p>Kerala PSC Live is an independent initiative by job aspirants for job aspirants.</p>
        <p className="mt-1">Last updated: June 2025</p>
      </div>
    </div>
  );
}