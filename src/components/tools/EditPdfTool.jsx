import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import { addTextToPdf } from "../../utils/pdfUtils";

export default function EditPdfTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("Sample text");
  const [pageNumber, setPageNumber] = useState(1);
  const [fontSize, setFontSize] = useState(24);
  const [status, setStatus] = useState({});

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFile(accepted[0])} accept={{ "application/pdf": [".pdf"] }} label={file ? file.name : "Drop a PDF to edit"} />
      <input className="p-4 rounded-xl border border-gray-300 w-full" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-4">
        <input type="number" className="p-4 rounded-xl border w-32" value={pageNumber} onChange={(e) => setPageNumber(Number(e.target.value) || 1)} />
        <input type="number" className="p-4 rounded-xl border w-32" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value) || 24)} />
      </div>
      <MessageBox status={status} />
      <Button onClick={async () => { setStatus({}); await addTextToPdf(file, { text, pageNumber, fontSize }, setStatus); await tryConsumeAfterSuccess(); }} text="Add Text" busy={status.type === "loading"} />
    </div>
  );
}
