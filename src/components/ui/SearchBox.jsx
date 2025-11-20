import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-md mx-auto md:mx-0"
    >
      <div className="
        flex items-center gap-3 
        bg-white border border-gray-300 
        rounded-full px-4 py-2 
        shadow-sm 
        transition 
        focus-within:border-lime-500 
        focus-within:shadow-md
      ">

        {/* Search Icon */}
        <Search className="w-5 h-5 text-gray-500" />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search PDF tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1 bg-transparent outline-none 
            text-sm md:text-base 
            placeholder-gray-500
          "
        />

        {/* Search Button */}
        <button
          type="submit"
          className="
            bg-lime-600 text-white 
            px-4 py-1.5 
            rounded-full 
            text-sm 
            hover:bg-lime-700 
            transition
            hidden sm:block
          "
        >
          Search
        </button>
      </div>
    </form>
  );
}
