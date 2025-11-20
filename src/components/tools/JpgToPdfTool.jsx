import React, { useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";
import { imagesToPdf } from "../../utils/pdfUtils";

export default function JpgToPdfTool({ tryConsumeAfterSuccess }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);

  return (
    <div className="space-y-6">
      <FileUploader onFiles={(accepted) => setFiles((f) => [...f, ...accepted])} accept={{ "image/*": [".png", ".jpg", ".jpeg"] }} label="Drop JPG/PNG images" />
      <MessageBox status={status} />
      {progress > 0 && <Progress percent={progress} label="Converting..." />}
      <Button onClick={async () => { setStatus({}); await imagesToPdf(files, setProgress, setStatus); await tryConsumeAfterSuccess(); }} text="Convert to PDF" busy={status.type === "loading"} />
    </div>
  );
}
