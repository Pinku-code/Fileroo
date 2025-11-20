export async function loadPdfJs() {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (window.pdfjsLib) return resolve(window.pdfjsLib);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;

    script.onload = () => {
      if (!window.pdfjsLib) {
        return reject("PDF.js global variable not found");
      }

      // Load worker
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      resolve(window.pdfjsLib);
    };

    script.onerror = () => reject("Failed to load PDF.js");

    document.body.appendChild(script);
  });
}
