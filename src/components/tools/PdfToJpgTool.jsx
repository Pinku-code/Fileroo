import React, { useRef, useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";
import { pdfToJpg } from "../../utils/pdfUtils";

export default function PdfToJpgTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef();

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} label={file ? file.name : "Drop a PDF to convert"} />
      <div className="flex gap-4">
        <input type="number" className="p-4 rounded-xl border border-gray-300 w-32" value={page} onChange={(e) => setPage(Number(e.target.value) || 1)} />
        <div className="text-gray-500 self-center">page</div>
      </div>
      <MessageBox status={status} />
      {progress > 0 && <Progress percent={progress} label="Rendering..." />}
      <Button onClick={async () => { setStatus({}); await pdfToJpg(file, page, setProgress, setStatus); await tryConsumeAfterSuccess(); }} text="Convert to JPG" busy={status.type === "loading"} />
      <canvas ref={canvasRef} hidden />
    </div>
  );
}
