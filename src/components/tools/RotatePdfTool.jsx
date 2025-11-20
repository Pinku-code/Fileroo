import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";

export default function RotatePdfTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [degrees, setDegrees] = useState(90);
  const [status, setStatus] = useState({});

  async function handleRotate() {
    try {
      if (!window.PDFLib) throw new Error("PDF library not loaded.");
      if (!file) return setStatus({ type: "error", message: "Drop a PDF" });

      setStatus({ type: "loading", message: "Rotating..." });
      const { PDFDocument } = window.PDFLib;
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      pdf.getPages().forEach((p) => p.setRotation({ type: "degrees", angle: degrees }));
      const out = await pdf.save();
      const { saveAs } = await import("file-saver");
      saveAs(new Blob([out]), `rotated_${file.name}`);
      setStatus({ type: "success", message: "Rotated — download started." });
      await tryConsumeAfterSuccess();
    } catch (e) {
      setStatus({ type: "error", message: e.message || String(e) });
    }
  }

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} label={file ? file.name : "Drop a PDF to rotate"} />
      <select className="p-4 rounded-xl border border-gray-300 w-40" value={degrees} onChange={(e) => setDegrees(Number(e.target.value))}>
        <option value={90}>90°</option>
        <option value={180}>180°</option>
        <option value={270}>270°</option>
      </select>
      <MessageBox status={status} />
      <Button onClick={handleRotate} text="Rotate PDF" busy={status.type === "loading"} />
    </div>
  );
}
