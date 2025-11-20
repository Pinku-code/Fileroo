import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";

export default function WatermarkTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [wmText, setWmText] = useState("SAMPLE");
  const [status, setStatus] = useState({});

  async function applyWatermark() {
    try {
      if (!window.PDFLib) throw new Error("PDF library not loaded.");
      if (!file) return setStatus({ type: "error", message: "Drop a PDF" });

      setStatus({ type: "loading", message: "Applying watermark..." });
      const { PDFDocument, StandardFonts } = window.PDFLib;
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = pdf.getPages();
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      for (const pg of pages) {
        const { width, height } = pg.getSize();
        pg.drawText(wmText, { x: width / 4, y: height / 2, size: 64, font, opacity: 0.12, rotate: { type: "degrees", angle: -45 } });
      }
      const out = await pdf.save();
      const { saveAs } = await import("file-saver");
      saveAs(new Blob([out]), `watermarked_${file.name}`);
      setStatus({ type: "success", message: "Watermark applied — download started." });
      await tryConsumeAfterSuccess();
    } catch (e) {
      setStatus({ type: "error", message: e.message || String(e) });
    }
  }

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} label={file ? file.name : "Drop a PDF to watermark"} />
      <input className="p-4 rounded-xl border border-gray-300 w-full" value={wmText} onChange={(e) => setWmText(e.target.value)} />
      <MessageBox status={status} />
      <Button onClick={applyWatermark} text="Apply Watermark" busy={status.type === "loading"} />
    </div>
  );
}
