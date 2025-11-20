import { Link } from "react-router-dom";

export default function ToolCard({ tool }) {
  const Icon = tool.icon;
  return (
    <Link
      to={`/${tool.slug}`}
      className="p-7 rounded-2xl border border-gray-200 bg-lime-100 hover:bg-lime-200 transition"
    >
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-xl bg-lime-100 text-lime-600 flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <div className="text-xl font-bold">{tool.name}</div>
          <div className="text-gray-600 mt-1">{tool.description}</div>
        </div>
      </div>
    </Link>
  );
}
