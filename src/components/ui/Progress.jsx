import React from "react";

export default function Progress({ percent = 0, label }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <div>{label}</div>
        <div>{percent}%</div>
      </div>
      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-lime-400 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
