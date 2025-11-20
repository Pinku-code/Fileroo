import { saveAs } from "file-saver";

/* -----------------------------
   1) MERGE PDFS
----------------------------- */
export async function mergePdfs(
  files = [],
  setProgress = () => {},
  setStatus = () => {}
) {
  try {
    if (!window.PDFLib) throw new Error("PDF-lib not loaded.");
    const { PDFDocument } = window.PDFLib;

    if (!files.length) throw new Error("No PDFs selected.");

    setStatus({ type: "loading", message: "Merging PDFs..." });
    setProgress(10);

    const out = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

      const copied = await out.copyPages(pdf, pdf.getPageIndices());
      copied.forEach((page) => out.addPage(page));

      setProgress(Math.round(((i + 1) / files.length) * 80));
    }

    const outBytes = await out.save();
    saveAs(new Blob([outBytes]), "merged.pdf");

    setProgress(100);
    setStatus({ type: "success", message: "Merged — download started." });

    return { ok: true };
  } catch (e) {
    setStatus({ type: "error", message: e.message });
    setProgress(0);
    return { ok: false };
  }
}

/* -----------------------------
   2) PDF → JPG
----------------------------- */
export async function pdfToJpg(
  file,
  page = 1,
  setProgress = () => {},
  setStatus = () => {}
) {
  try {
    if (!window.pdfjsLib) throw new Error("PDF.js not loaded.");
    const pdfjs = window.pdfjsLib;

    setStatus({ type: "loading", message: "Rendering page..." });
    setProgress(10);

    const pdf = await pdfjs.getDocument(await file.arrayBuffer()).promise;

    if (page < 1 || page > pdf.numPages) {
      throw new Error(`PDF has only ${pdf.numPages} pages.`);
    }

    const pg = await pdf.getPage(page);
    const viewport = pg.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    setProgress(40);

    await pg.render({
      canvasContext: canvas.getContext("2d"),
      viewport,
    }).promise;

    setProgress(80);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.92)
    );

    if (!blob) throw new Error("Failed to export JPEG.");

    saveAs(blob, `${file.name.replace(/\.pdf$/i, "")}_page${page}.jpg`);

    setStatus({ type: "success", message: "JPG downloaded." });
    setProgress(100);

    return { ok: true };
  } catch (e) {
    setStatus({ type: "error", message: e.message });
    setProgress(0);
    return { ok: false };
  }
}

/* -----------------------------
   3) IMAGES → PDF
----------------------------- */
export async function imagesToPdf(
  files = [],
  setProgress = () => {},
  setStatus = () => {}
) {
  try {
    if (!window.PDFLib) throw new Error("PDF-lib not loaded.");
    const { PDFDocument } = window.PDFLib;

    setStatus({ type: "loading", message: "Converting images..." });
    setProgress(10);

    const pdf = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const bytes = await files[i].arrayBuffer();

      const img =
        files[i].type === "image/png"
          ? await pdf.embedPng(bytes)
          : await pdf.embedJpg(bytes);

      const page = pdf.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });

      setProgress(Math.round(((i + 1) / files.length) * 80));
    }

    const out = await pdf.save();
    saveAs(new Blob([out]), "images.pdf");

    setProgress(100);
    setStatus({ type: "success", message: "PDF downloaded." });

    return { ok: true };
  } catch (e) {
    setStatus({ type: "error", message: e.message });
    setProgress(0);
    return { ok: false };
  }
}

/* -----------------------------
   4) ADD TEXT TO PDF (Edit PDF)
----------------------------- */
export async function addTextToPdf(
  file,
  { text = "Sample", pageNumber = 1, fontSize = 24 } = {},
  setStatus = () => {}
) {
  try {
    if (!window.PDFLib) throw new Error("PDF-lib not loaded.");
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;

    setStatus({ type: "loading", message: "Editing PDF..." });

    const pdf = await PDFDocument.load(await file.arrayBuffer(), {
      ignoreEncryption: true,
    });

    const pages = pdf.getPages();
    const pageIndex = Math.max(
      0,
      Math.min(pages.length - 1, pageNumber - 1)
    );

    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    const pageObj = pages[pageIndex];
    const { width, height } = pageObj.getSize();

    pageObj.drawText(text, {
      x: 40,
      y: height - 60,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    const out = await pdf.save();
    saveAs(new Blob([out]), `edited_${file.name}`);

    setStatus({ type: "success", message: "Edit applied — download started." });

    return { ok: true };
  } catch (e) {
    setStatus({ type: "error", message: e.message });
    return { ok: false };
  }
}
