import React from "react";

export default function Button({ text, onClick, busy = false, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className={`${className} w-full px-6 py-4 rounded-xl text-lg font-semibold cursor-pointer ${busy ? "bg-lime-300" : "bg-lime-400 hover:bg-lime-500"} text-black`}
    >
      {busy ? "Working…" : text}
    </button>
  );
}
