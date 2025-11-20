import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon } from "lucide-react";

export default function FileUploader({ onFiles, accept, multiple = true, label }) {
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const items = await Promise.all(
        acceptedFiles.map(async (f) => {
          if (f.type.startsWith("image/")) {
            const url = URL.createObjectURL(f);
            return { file: f, type: "image", thumb: url };
          } else if (f.type === "application/pdf") {
            let thumb = null;
            try {
              const pdfjs = window["pdfjs-dist/build/pdf"];
              if (pdfjs) {
                const bytes = await f.arrayBuffer();
                const doc = await pdfjs.getDocument({ data: bytes }).promise;
                const pg = await doc.getPage(1);
                const vp = pg.getViewport({ scale: 1.2 });
                const canvas = document.createElement("canvas");
                canvas.width = vp.width;
                canvas.height = vp.height;
                await pg.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
                thumb = canvas.toDataURL("image/jpeg", 0.8);
              }
            } catch {}
            return { file: f, type: "pdf", thumb };
          } else {
            return { file: f, type: "file", thumb: null };
          }
        })
      );

      setPreviews((p) => [...p, ...items]);
      if (onFiles) onFiles(acceptedFiles, items);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple });

  useEffect(() => {
    return () => {
      previews.forEach((p) => p.thumb && p.thumb.startsWith("blob:") && URL.revokeObjectURL(p.thumb));
    };
  }, [previews]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-8 rounded-2xl border-2 border-dashed ${isDragActive ? "border-lime-500 bg-lime-50" : "border-gray-300"} cursor-pointer`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center gap-4">
          <UploadCloud className="w-10 h-10 text-lime-500" />
          <div>
            <div className="text-xl font-semibold">{label || "Drag & drop, or click to upload"}</div>
            <div className="text-gray-500">Files are processed in your browser</div>
          </div>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {previews.map((p, i) => (
            <div key={i} className="border rounded-lg overflow-hidden text-center p-2 bg-white">
              {p.thumb ? (
                <img src={p.thumb} alt={p.file.name} className="w-full h-24 object-cover" />
              ) : (
                <div className="flex items-center justify-center h-24">
                  <FileIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="text-xs mt-2 truncate">{p.file.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
