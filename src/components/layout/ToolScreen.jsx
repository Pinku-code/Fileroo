import React from "react";
import { ArrowLeft } from "lucide-react";

export default function ToolScreen({ activeTool, setActiveTool, libsReady, hasQuota, tryConsumeAfterSuccess }) {
  const ToolComponent = activeTool.component;
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setActiveTool(null)} className="p-3 border border-gray-200 bg-lime-400 rounded-xl hover:bg-lime-500 cursor-pointer">
          <ArrowLeft />
        </button>
        <div>
          <div className="text-3xl font-bold">{activeTool.name}</div>
          <div className="text-gray-500">{activeTool.description}</div>
        </div>
      </div>

      <div className="p-8 rounded-2xl border border-gray-200 bg-white">
        {!libsReady ? (
          <div className="text-center text-lg py-10">Loading libraries...</div>
        ) : (
          <ToolComponent hasQuota={hasQuota} tryConsumeAfterSuccess={tryConsumeAfterSuccess} />
        )}
      </div>
    </div>
  );
}
