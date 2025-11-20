import React, { useRef, useState } from "react";
import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import MessageBox from "../ui/MessageBox";
import Progress from "../ui/Progress";
import { generateThumbnails } from "../../utils/thumbnailUtils";

export default function OrganizePdfTool({ tryConsumeAfterSuccess }) {
  const [file, setFile] = useState(null);
  const [pageThumbs, setPageThumbs] = useState([]);
  const [status, setStatus] = useState({});
  const [progress, setProgress] = useState(0);
  const [maxPages, setMaxPages] = useState(100);

  const dragRef = useRef({ from: null });

  // ------- Load PDF & generate thumbnails -------
  async function onFiles(accepted) {
    const f = accepted[0];
    setFile(f);
    setPageThumbs([]);
    setStatus({});

    try {
      setProgress(5);

      const thumbs = await generateThumbnails(f, maxPages, setProgress);

      setPageThumbs(thumbs);
      setStatus({ type: "success", message: `Loaded ${thumbs.length} pages` });

      setTimeout(() => setProgress(0), 600);
    } catch (e) {
      setStatus({ type: "error", message: e.message });
      setProgress(0);
    }
  }

  // ------- Drag & drop logic -------
  function onDragStart(e, idx) {
    dragRef.current.from = idx;
    e.dataTransfer?.setData("text/plain", String(idx));
    e.dataTransfer?.setDragImage(new Image(), 0, 0);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDropThumbnail(e, toIdx) {
    e.preventDefault();
    const from = dragRef.current.from;
    if (from == null) return;

    const arr = [...pageThumbs];
    const [item] = arr.splice(from, 1);
    arr.splice(toIdx, 0, item);

    setPageThumbs(arr);
    dragRef.current.from = null;
  }

  // ------- SAVE reordered PDF -------
  async function applyReorder() {
    try {
      if (!window.PDFLib) throw new Error("PDF-lib not loaded.");
      if (!file || pageThumbs.length === 0)
        return setStatus({ type: "error", message: "Load a PDF first." });

      setStatus({ type: "loading", message: "Reordering PDF..." });
      setProgress(5);

      const { PDFDocument } = window.PDFLib;

      const bytes = await file.arrayBuffer();
      const original = await PDFDocument.load(bytes, { ignoreEncryption: true });

      const newDoc = await PDFDocument.create();

      // IMPORTANT: REAL PAGE ORDER
      const order = pageThumbs.map((p) => p.pageOriginalIndex);

      const copied = await newDoc.copyPages(original, order);
      copied.forEach((pg) => newDoc.addPage(pg));

      setProgress(80);

      const out = await newDoc.save();
      const { saveAs } = await import("file-saver");

      saveAs(new Blob([out]), `reordered_${file.name}`);

      setStatus({ type: "success", message: "Reordered PDF saved!" });
      setProgress(100);

      await tryConsumeAfterSuccess();

      setTimeout(() => setProgress(0), 700);
    } catch (e) {
      setStatus({ type: "error", message: e.message });
      setProgress(0);
    }
  }

  // ----------------------------------------------------------------
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <FileUploader
            onFiles={onFiles}
            accept={{ "application/pdf": [".pdf"] }}
            label={file ? file.name : "Drop PDF to load pages"}
          />
        </div>
        <div className="w-44">
          <label className="block text-sm text-gray-600 mb-2">
            Max pages to load
          </label>
          <input
            type="number"
            className="p-3 rounded-xl border border-gray-300 w-full"
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value) || 50)}
          />
        </div>
      </div>

      <MessageBox status={status} />
      {progress > 0 && (
        <Progress percent={progress} label="Preparing thumbnails..." />
      )}

      {pageThumbs.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
            {pageThumbs.map((p, i) => (
              <div
                key={i}
                draggable
                onDragStart={(e) => onDragStart(e, i)}
                onDragOver={onDragOver}
                onDrop={(e) => onDropThumbnail(e, i)}
                className="border rounded-lg overflow-hidden bg-white p-1 cursor-grab"
              >
                <img
                  src={p.thumb}
                  alt={`page-${i + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="text-center text-sm py-2">
                  Page {i + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              onClick={applyReorder}
              text="Apply Reorder"
              busy={status.type === "loading"}
            />
            <button
              onClick={() =>
                alert(
                  "Drag thumbnails to reorder pages.\nThen click Apply Reorder to save the new PDF."
                )
              }
              className="px-6 py-4 rounded-xl border"
            >
              Help
            </button>
          </div>
        </>
      )}
    </div>
  );
}
