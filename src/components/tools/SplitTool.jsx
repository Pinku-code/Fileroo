import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";
// import { PDFDocument } from "" ; // we use window.PDFLib in code below

export default function SplitTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [range, setRange] = useState("");
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);

  async function handleSplit() {
    try {
      if (!window.PDFLib) throw new Error("PDF library not loaded.");
      if (!file || !range) return setStatus({ type: "error", message: "Select a file and specify pages (e.g., 1,3-5)." });

      setStatus({ type: "loading", message: "Splitting..." });
      setProgress(10);
      const { PDFDocument } = window.PDFLib;
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

      const parts = range.split(",").map((p) => p.trim()).filter(Boolean);
      const indices = [];
      for (const part of parts) {
        if (part.includes("-")) {
          const [s, e] = part.split("-").map(Number);
          for (let i = s; i <= e; i++) indices.push(i - 1);
        } else {
          indices.push(Number(part) - 1);
        }
      }
      const valid = indices.filter((i) => Number.isFinite(i) && i >= 0 && i < pdf.getPageCount());
      const out = await PDFDocument.create();
      const copied = await out.copyPages(pdf, valid);
      copied.forEach((pg) => out.addPage(pg));
      setProgress(80);
      const outBytes = await out.save();
      const { saveAs } = await import("file-saver");
      saveAs(new Blob([outBytes]), `split_${file.name}`);
      setProgress(100);
      setStatus({ type: "success", message: "Split complete — download started." });
      await tryConsumeAfterSuccess();
    } catch (e) {
      setStatus({ type: "error", message: e.message || String(e) });
      setProgress(0);
    } finally {
      setTimeout(() => setProgress(0), 700);
    }
  }

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} label={file ? file.name : "Drop a PDF to split"} />
      <input className="p-4 rounded-xl border border-gray-300 w-full" placeholder="Pages e.g. 1,3-5" value={range} onChange={(e) => setRange(e.target.value)} />
      <MessageBox status={status} />
      {progress > 0 && <Progress percent={progress} label="Splitting..." />}
      <Button onClick={handleSplit} text="Split PDF" busy={status.type === "loading"} />
    </div>
  );
}
