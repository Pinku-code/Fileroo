import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";

export default function PageNumberTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [start, setStart] = useState(1);
  const [status, setStatus] = useState({});

  async function applyNumbers() {
    try {
      if (!window.PDFLib) throw new Error("PDF library not loaded.");
      if (!file) return setStatus({ type: "error", message: "Drop a PDF" });

      setStatus({ type: "loading", message: "Adding page numbers..." });
      const { PDFDocument, StandardFonts } = window.PDFLib;
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const pages = pdf.getPages();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      pages.forEach((pg, idx) => {
        const { width } = pg.getSize();
        pg.drawText(String(start + idx), { x: width / 2, y: 40, size: 12, font });
      });
      const out = await pdf.save();
      const { saveAs } = await import("file-saver");
      saveAs(new Blob([out]), `pagenum_${file.name}`);
      setStatus({ type: "success", message: "Page numbers added — download started." });
      await tryConsumeAfterSuccess();
    } catch (e) {
      setStatus({ type: "error", message: e.message || String(e) });
    }
  }

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} />
      <div className="flex gap-4">
        <input className="p-3 rounded-xl border w-40" type="number" value={start} onChange={(e) => setStart(Number(e.target.value) || 1)} />
      </div>
      <MessageBox status={status} />
      <Button onClick={applyNumbers} text="Add Page Numbers" busy={status.type === "loading"} />
    </div>
  );
}
