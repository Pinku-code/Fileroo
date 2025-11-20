import React, { useState, useRef } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";

export default function ComparePdfTool({ tryConsumeAfterSuccess }) {
  const [files, setFiles] = useState([]);
  const [threshold, setThreshold] = useState(0.1);
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);
  const canvasA = useRef();
  const canvasB = useRef();
  const canvasDiff = useRef();

  async function handleCompare() {
    try {
      if (!window["pdfjs-dist/build/pdf"]) throw new Error("PDF.js not loaded.");
      if (!window.pixelmatch) throw new Error("pixelmatch not loaded.");
      if (files.length < 2) return setStatus({ type: "error", message: "Drop two PDFs to compare (first pages used)." });

      setStatus({ type: "loading", message: "Rendering pages..." });
      setProgress(10);
      const pdfjs = window["pdfjs-dist/build/pdf"];
      const [A, B] = files;
      const docA = await pdfjs.getDocument(await A.arrayBuffer()).promise;
      const docB = await pdfjs.getDocument(await B.arrayBuffer()).promise;
      setProgress(30);
      const pA = await docA.getPage(1);
      const pB = await docB.getPage(1);

      const scale = 1.5;
      const vpA = pA.getViewport({ scale });
      const vpB = pB.getViewport({ scale });

      const targetW = Math.max(vpA.width, vpB.width);
      const targetH = Math.max(vpA.height, vpB.height);

      const ca = canvasA.current;
      const cb = canvasB.current;
      ca.width = targetW; ca.height = targetH;
      cb.width = targetW; cb.height = targetH;

      // helper
      async function renderPageToCanvas(page, canvas) {
        const vp = page.getViewport({ scale: 1 });
        const tmp = document.createElement("canvas");
        tmp.width = vp.width; tmp.height = vp.height;
        await page.render({ canvasContext: tmp.getContext("2d"), viewport: vp }).promise;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, 0, 0, canvas.width, canvas.height);
      }

      await renderPageToCanvas(pA, ca);
      await renderPageToCanvas(pB, cb);

      setProgress(70);
      const w = ca.width; const h = ca.height;
      const imgA = ca.getContext("2d").getImageData(0, 0, w, h);
      const imgB = cb.getContext("2d").getImageData(0, 0, w, h);
      const diffCanvas = canvasDiff.current;
      diffCanvas.width = w; diffCanvas.height = h;
      const diffCtx = diffCanvas.getContext("2d");
      const diffImg = diffCtx.createImageData(w, h);
      const mismatch = window.pixelmatch(imgA.data, imgB.data, diffImg.data, w, h, { threshold });
      diffCtx.putImageData(diffImg, 0, 0);
      setStatus({ type: "success", message: `${mismatch} pixels differ.` });
      setProgress(100);
      await tryConsumeAfterSuccess();
      setTimeout(() => setProgress(0), 600);
    } catch (e) {
      setStatus({ type: "error", message: e.message || String(e) });
      setProgress(0);
    }
  }

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFiles((prev) => [...prev.slice(-1), ...accepted].slice(0, 2))} accept={{ "application/pdf": [".pdf"] }} label="Drop two PDFs (first pages compared)" />
      <div className="flex gap-4 items-center">
        <input className="p-3 rounded-xl border w-40" type="number" value={threshold} step="0.01" onChange={(e) => setThreshold(Number(e.target.value) || 0)} />
        <div className="text-gray-500">threshold</div>
      </div>

      <MessageBox status={status} />
      {progress > 0 && <Progress percent={progress} label="Comparing..." />}
      <Button onClick={handleCompare} text="Compare PDFs" busy={status.type === "loading"} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div>
          <div className="text-sm mb-2">PDF A</div>
          <canvas ref={canvasA} className="w-full rounded-xl border border-gray-300" />
        </div>
        <div>
          <div className="text-sm mb-2">PDF B</div>
          <canvas ref={canvasB} className="w-full rounded-xl border border-gray-300" />
        </div>
        <div>
          <div className="text-sm mb-2">Diff</div>
          <canvas ref={canvasDiff} className="w-full rounded-xl border border-gray-300" />
        </div>
      </div>
    </div>
  );
}
