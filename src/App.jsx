import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { tools as TOOL_REGISTRY } from "./config/tools";
import Hero from "./components/layout/Hero";
import ToolCard from "./components/layout/ToolCard";
import ToolScreen from "./components/layout/ToolScreen";
import useLazyScript from "./hooks/useLazyScript";

export default function App() {
  const { user, isSignedIn } = useUser?.() || {}; // if Clerk isn't wired up in dev, this will be undefined-safe
  const [libsReady, setLibsReady] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  // load external libs
  useEffect(() => {
    async function loadAll() {
      await Promise.all([
        useLazyScript("/scripts/pdf-lib.min.js", "pdf-lib"),
        useLazyScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", "pdfjs"),
        useLazyScript("https://cdnjs.cloudflare.com/ajax/libs/pixelmatch/5.3.0/pixelmatch.min.js", "pixelmatch"),
        useLazyScript("https://unpkg.com/tesseract.js@4.0.2/dist/tesseract.min.js", "tesseract"),
      ]);
      try {
        const pdfjs = window["pdfjs-dist/build/pdf"];
        if (pdfjs) pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      } catch {}
      setLibsReady(true);
    }
    loadAll();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Hero />

          {!activeTool ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOL_REGISTRY.map((t) => (
                <ToolCard key={t.slug} tool={t} onOpen={() => setActiveTool(t)} />
              ))}
            </div>
          ) : (
            <ToolScreen
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              libsReady={libsReady}
              hasQuota={() => true}
              tryConsumeAfterSuccess={async () => ({ ok: true, remaining: Infinity })}
            />
          )}
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-700">Fileroo — Fast PDF tools</p>
          <p className="mt-2">© {new Date().getFullYear()} Fileroo. All processing happens in your browser.</p>
        </div>
      </footer>
    </div>
  );
}
