// import { useSearchParams } from "react-router-dom";

// export default function SearchPage() {
//   const [params] = useSearchParams();
//   const query = params.get("query");

//   return (
//     <div className="pt-28 max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Search Results</h1>
//       <p>You searched for: <strong>{query}</strong></p>
//     </div>
//   );
// }


import { useSearchParams, Link } from "react-router-dom";
import { tools } from "../config/tools";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").toLowerCase();

  const results = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
  );

  return (
    <div className="pt-28 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {query ? (
        <p className="mb-4">You searched for: <strong>{query}</strong></p>
      ) : (
        <p className="text-gray-500">Type something in the search box…</p>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.length === 0 ? (
          <p className="text-gray-500 col-span-full">No tools found.</p>
        ) : (
          results.map((tool) => (
            <Link
              key={tool.slug}
              to={`/${tool.slug}`}
              className="p-6 rounded-xl border bg-lime-100 shadow-sm hover:shadow-md hover:bg-lime-200 transition"
            >
              <div className="text-lg font-semibold">{tool.name}</div>
              <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
