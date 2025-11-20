export default function Contact() {
  return (
    <div className="pt-28 pb-20 px-6 flex justify-center">
      <div className="max-w-2xl text-gray-700">

        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          Contact Us
        </h1>

        <p className="text-lg leading-relaxed text-justify text-gray-600 mb-10">
          We’re here to help. Whether you have a question, feedback, feature request,
          or simply want to report an issue, feel free to reach out to us.  
          Our team reads every message and responds as quickly as possible.
        </p>

        {/* How to Reach Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            📩 Email Support
          </h2>
          <p className="leading-relaxed text-justify">
            For all inquiries—including bug reports, tool suggestions, or partnership
            opportunities—you can email us anytime at:
          </p>

          <p className="mt-4 font-semibold text-black text-lg">
            support@fileroo.com
          </p>

          <p className="leading-relaxed text-justify mt-4">
            We typically reply within 24–48 hours.
          </p>
        </section>

        {/* Contact Form */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            📝 Send Us a Message
          </h2>

          <p className="leading-relaxed text-justify mb-6">
            Prefer sending a message directly? Use the form below and we’ll reach out
            to you as soon as possible.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Your Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Your Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-xl"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                className="w-full p-3 border rounded-xl h-32 resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-xl bg-lime-600 text-white font-medium hover:bg-lime-700 transition"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Help Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            💬 Before Contacting Us
          </h2>

          <p className="leading-relaxed text-justify">
            Many questions are common, so here are a few helpful notes:
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-3 text-justify">
            <li>
              <strong>We never store your files.</strong> All PDF processing happens locally
              in your browser.
            </li>
            <li>
              <strong>If a tool isn't working</strong>, clearing cache or refreshing usually fixes it.
            </li>
            <li>
              <strong>New tools are added regularly.</strong> Feel free to suggest one!
            </li>
          </ul>
        </section>

        {/* Closing */}
        <section className="text-center mt-14">
          <h3 className="text-2xl font-semibold text-black mb-4">
            Thank you for choosing Fileroo
          </h3>
          <p className="text-gray-600 leading-relaxed text-justify">
            Your support helps us continue building fast, private, and reliable PDF tools.
            We’re always here to help whenever you need us.
          </p>
        </section>

      </div>
    </div>
  );
}
