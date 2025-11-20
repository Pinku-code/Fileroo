// export async function generateThumbnails(file, maxPages = 100, setProgress = () => {}) {
//   if (!window["pdfjs-dist/build/pdf"]) throw new Error("PDF.js not loaded.");
//   const pdfjs = window["pdfjs-dist/build/pdf"];
//   const bytes = await file.arrayBuffer();
//   const doc = await pdfjs.getDocument({ data: bytes }).promise;
//   const total = Math.min(doc.numPages, Math.max(1, maxPages));
//   const thumbs = [];
//   for (let i = 1; i <= total; i++) {
//     const pg = await doc.getPage(i);
//     const vp = pg.getViewport({ scale: 1.0 });
//     const scaleFactor = Math.min(200 / vp.width, 200 / vp.height, 1);
//     const thumbVP = pg.getViewport({ scale: scaleFactor });
//     const canvas = document.createElement("canvas");
//     canvas.width = thumbVP.width;
//     canvas.height = thumbVP.height;
//     await pg.render({ canvasContext: canvas.getContext("2d"), viewport: thumbVP }).promise;
//     thumbs.push({ idx: i - 1, thumb: canvas.toDataURL("image/jpeg", 0.8) });
//     setProgress(Math.round((i / total) * 80));
//   }
//   setProgress(100);
//   return thumbs;
// }



export async function generateThumbnails(file, maxPages = 100, setProgress = () => {}) {
  if (!window.pdfjsLib) throw new Error("PDF.js not loaded.");
  const pdfjs = window.pdfjsLib;

  const bytes = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: bytes }).promise;

  const total = Math.min(doc.numPages, Math.max(1, maxPages));
  const thumbs = [];

  for (let i = 1; i <= total; i++) {
    const pg = await doc.getPage(i);
    const vp = pg.getViewport({ scale: 1.0 });

    // produce a 200px thumbnail
    const scaleFactor = Math.min(200 / vp.width, 200 / vp.height, 1);
    const thumbVP = pg.getViewport({ scale: scaleFactor });

    const canvas = document.createElement("canvas");
    canvas.width = thumbVP.width;
    canvas.height = thumbVP.height;

    await pg.render({
      canvasContext: canvas.getContext("2d"),
      viewport: thumbVP,
    }).promise;

    thumbs.push({
      pageOriginalIndex: i - 1,   // 👈 REAL PAGE INDEX (IMPORTANT!)
      thumb: canvas.toDataURL("image/jpeg", 0.8),
    });

    setProgress(Math.round((i / total) * 80));
  }

  setProgress(100);
  return thumbs;
}
