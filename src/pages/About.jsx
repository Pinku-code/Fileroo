export default function About() {
  return (
    <div className="pt-28 pb-20 px-6 flex justify-center">
      {/* Narrower width */}
      <div className="max-w-2xl text-gray-700">

        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          About Fileroo
        </h1>

        <p className="text-lg leading-relaxed text-justify text-gray-600 mb-10">
          Fileroo is a modern suite of fast, secure, and browser-based PDF tools
          designed for people who want simplicity without sacrificing privacy.
          Every operation runs directly on your device — no slow uploads, no servers,
          no risks.
        </p>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
          <p className="leading-relaxed text-justify">
            Our mission is to make everyday PDF tasks effortless. Most PDF tools rely
            on uploading files to remote servers, which is slow and unsafe.
            Fileroo takes a different approach:
            <span className="font-semibold text-black"> all processing happens locally in your browser.</span>
          </p>
          <p className="leading-relaxed mt-3 text-justify">
            This ensures your files never leave your device — offering privacy,
            security, and speed.
          </p>
        </section>

        {/* Why Local-First */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">Why Local-First?</h2>
          <ul className="list-disc pl-6 space-y-3 text-justify">
            <li><strong>More Secure:</strong> Your PDFs stay on your device.</li>
            <li><strong>Lightning Fast:</strong> Tools run instantly without upload delays.</li>
            <li><strong>Private by Design:</strong> Even we cannot access your documents.</li>
            <li><strong>Works Offline:</strong> Many tools run even without internet.</li>
          </ul>
        </section>

        {/* Tools */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">What Fileroo Can Do</h2>
          <p className="leading-relaxed text-justify">
            Fileroo includes a complete collection of essential PDF tools such as:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-justify">
            <li>Merge PDFs</li>
            <li>Split PDFs</li>
            <li>PDF → JPG and JPG → PDF</li>
            <li>Rotate PDFs</li>
            <li>Add watermarks</li>
            <li>Add text to PDFs</li>
            <li>Add page numbers</li>
            <li>Reorder pages visually</li>
            <li>OCR (text extraction)</li>
            <li>PDF comparison</li>
          </ul>
        </section>

        {/* Built for Everyone */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">Built for Everyone</h2>
          <p className="leading-relaxed text-justify">
            Whether you're a student, teacher, freelancer, or professional,
            Fileroo is made for you. No signups, no ads, no clutter — just fast,
            secure tools that work instantly.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Vision</h2>
          <p className="leading-relaxed text-justify">
            We believe the future of document processing is local-first. As browsers
            advance, more tasks can be done instantly and privately on-device —
            without relying on servers.
          </p>
          <p className="leading-relaxed mt-3 text-justify">
            Fileroo is continuously growing with more tools, faster performance,
            and a cleaner user experience.
          </p>
        </section>

        <section className="text-center mt-14">
          <h3 className="text-2xl font-semibold text-black mb-4">
            Thank you for using Fileroo ❤️
          </h3>
          <p className="text-gray-600 leading-relaxed text-justify">
            We’re committed to building the fastest and safest PDF toolkit on the web.
          </p>
        </section>

      </div>
    </div>
  );
}
