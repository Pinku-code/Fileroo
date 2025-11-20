import { saveAs } from "file-saver";

export async function runOcrOnPages(file, pagesTo = 1, setProgress = () => {}, setStatus = () => {}) {
  if (!window["pdfjs-dist/build/pdf"]) throw new Error("PDF.js not loaded.");
  if (!window.Tesseract) throw new Error("Tesseract.js not loaded.");
  const pdfjs = window["pdfjs-dist/build/pdf"];
  const doc = await pdfjs.getDocument(await file.arrayBuffer()).promise;
  const total = Math.min(doc.numPages, pagesTo);
  let out = "";
  let worker = null;
  if (window.Tesseract.createWorker) {
    worker = window.Tesseract.createWorker({ logger: () => {} });
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
  }

  setStatus({ type: "loading", message: "Running OCR..." });
  for (let i = 1; i <= total; i++) {
    const pg = await doc.getPage(i);
    const vp = pg.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = vp.width;
    canvas.height = vp.height;
    await pg.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
    setProgress(Math.round((i / total) * 60));
    let text = "";
    if (worker) {
      const { data } = await worker.recognize(canvas);
      text = data.text;
    } else {
      const { data } = await window.Tesseract.recognize(canvas, "eng");
      text = data.text;
    }
    out += `--- Page ${i} ---\n${text}\n\n`;
    setProgress(Math.round(60 + (i / total) * 40));
  }

  if (worker) await worker.terminate();
  setStatus({ type: "success", message: "OCR complete" });
  setProgress(100);
  saveAs(new Blob([out], { type: "text/plain" }), "ocr.txt");
  return out;
}
