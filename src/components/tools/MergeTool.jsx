import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";
import { mergePdfs } from "../../utils/pdfUtils";

export default function MergeTool({ tryConsumeAfterSuccess }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);

  const handleMerge = async () => {
    if (files.length < 2) {
      setStatus({
        type: "error",
        message: "Please select at least two PDF files.",
      });
      return;
    }

    // Reset before merging
    setStatus({});
    setProgress(0);

    const result = await mergePdfs(
      files,
      (p) => setProgress(p),
      (s) => setStatus(s)
    );

    // 🟢 SUCCESS — DON'T set error afterwards
    if (result.ok) {
      try {
        await tryConsumeAfterSuccess();
      } catch {
        /* ignore quota errors — user removed payment */
      }
      return; // ← IMPORTANT: stop here.
    }

    // 🔴 If mergePdfs returned ok: false → real error
    setStatus({
      type: "error",
      message: "Something went wrong while merging.",
    });
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      <FileUploader
        onFiles={(accepted) => setFiles((f) => [...f, ...accepted])}
        accept={{ "application/pdf": [".pdf"] }}
        label="Drop PDFs to merge"
      />

      <MessageBox status={status} />

      {progress > 0 && <Progress percent={progress} label="Merging..." />}

      <Button
        text="Merge PDFs"
        busy={status.type === "loading"}
        onClick={handleMerge}
      />
    </div>
  );
}
