import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";
import { runOcrOnPages } from "../../utils/ocrUtils";

export default function OcrPdfTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [pagesTo, setPagesTo] = useState(1);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} />
      <div className="flex gap-4 items-center">
        <input className="p-3 rounded-xl border w-40" type="number" value={pagesTo} onChange={(e) => setPagesTo(Number(e.target.value) || 1)} />
        <div className="text-gray-500">pages to OCR (starting at page 1)</div>
      </div>

      <MessageBox status={status} />
      {progress > 0 && <Progress percent={progress} label="OCR progress" />}

      <div className="flex gap-3">
        <Button onClick={async () => { setStatus({}); const out = await runOcrOnPages(file, pagesTo, setProgress, setStatus); setResult(out); await tryConsumeAfterSuccess(); }} text="Run OCR" busy={status.type === "loading"} />
        <button onClick={() => { if (result) { const blob = new Blob([result], { type: "text/plain" }); import("file-saver").then(({ saveAs }) => saveAs(blob, "ocr.txt")); } }} disabled={!result} className="px-6 py-4 rounded-xl border text-lg">Download Text</button>
      </div>

      {result && <textarea className="w-full p-4 rounded-xl border border-gray-300 mt-4" rows={10} value={result} readOnly />}

    </div>
  );
}
