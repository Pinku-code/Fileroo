import ToolCard from "../components/layout/ToolCard";
import { tools } from "../config/tools";

export default function ToolsPage() {
  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-3">
        All PDF Tools
      </h1>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Browse our full collection of fast, secure, and browser-based PDF tools.
        No upload required — everything processes locally.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
