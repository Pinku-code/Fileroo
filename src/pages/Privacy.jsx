export default function Privacy() {
  return (
    <div className="pt-28 pb-20 px-6 flex justify-center">
      <div className="max-w-2xl text-gray-700">

        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          Privacy Policy
        </h1>

        <p className="text-lg leading-relaxed text-justify text-gray-600 mb-10">
          At Fileroo, your privacy is our top priority. Our PDF tools are designed
          to process files locally on your device, ensuring that your documents
          never leave your computer or browser.
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Information We Do Not Collect
          </h2>
          <p className="leading-relaxed text-justify">
            Fileroo does <strong>not</strong> upload, store, or view the files you use
            in our tools. All processing—such as merging, splitting, converting,
            editing, or extracting—happens directly inside your browser using
            local device resources.
          </p>
          <p className="leading-relaxed mt-3 text-justify">
            Since files never leave your device, we do not collect:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-justify">
            <li>PDF documents</li>
            <li>Images or media files</li>
            <li>Text extracted from files</li>
            <li>Any file content used inside tools</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            What Information We Collect
          </h2>
          <p className="leading-relaxed text-justify">
            We collect only minimal, non-identifiable information to ensure the
            website functions properly and to understand usage trends. This may include:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-justify">
            <li>Basic site analytics (page views, device type, browser type)</li>
            <li>Non-personal technical data used to ensure tool performance</li>
          </ul>
          <p className="leading-relaxed mt-3 text-justify">
            This information cannot be used to identify you or your documents.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Local File Processing
          </h2>
          <p className="leading-relaxed text-justify">
            All PDF operations on Fileroo are powered by technologies like
            WebAssembly, Web Workers, and modern browser APIs. These allow us
            to process files securely on your device without sending anything
            to a server.
          </p>
          <p className="leading-relaxed mt-3 text-justify">
            Your files stay 100% private.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Third-Party Services
          </h2>
          <p className="leading-relaxed text-justify">
            Fileroo may use third-party tools such as analytics or authentication
            providers (e.g., Clerk) to improve user experience. These services
            operate independently and handle their own privacy practices.
          </p>
          <p className="leading-relaxed mt-3 text-justify">
            No file content is ever shared with third-party providers.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Cookies
          </h2>
          <p className="leading-relaxed text-justify">
            Fileroo uses only essential cookies for authentication or site
            functionality. We do not use tracking cookies or advertising cookies.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Data Security
          </h2>
          <p className="leading-relaxed text-justify">
            Because files never leave your device, the risk of unauthorized access
            is extremely low. Fileroo does not store your documents, and we do not
            have access to the content you process.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed text-justify">
            We may update this Privacy Policy from time to time to reflect changes
            in technology, features, or legal requirements. When updates occur,
            the "Last Updated" date will be revised.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Contact Us
          </h2>
          <p className="leading-relaxed text-justify">
            If you have any questions about this Privacy Policy or how Fileroo
            handles your information, feel free to reach us through the Contact page.
          </p>
        </section>

        <footer className="text-center text-gray-500 mt-12">
          Last Updated: {new Date().getFullYear()}
        </footer>

      </div>
    </div>
  );
}
