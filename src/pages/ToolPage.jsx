import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ToolPage({ tool }) {
  const ToolComponent = tool.component;
    const tryConsumeAfterSuccess = async () => {
    return { ok: true };
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">

      {/* Back Button */}
      <Link
        to="/tools"
        className="inline-block mb-6 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
      >
        ← Back to Tools
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>

      {/* Description */}
      <p className="text-gray-600 mb-10">{tool.description}</p>

      {/* Tool Component */}
      {/* <div className="p-8 border rounded-2xl bg-white shadow-sm">
        <ToolComponent />
      </div> */}
      <div className="p-6 rounded-2xl border bg-white shadow-sm">
        <ToolComponent tryConsumeAfterSuccess={tryConsumeAfterSuccess} />
      </div>
    </div>
  );
}
