export async function loadPdfLib() {
  return new Promise((resolve, reject) => {
    if (window.PDFLib) return resolve(window.PDFLib);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
    script.async = true;

    script.onload = () => {
      if (!window.PDFLib) return reject("PDFLib not found");
      resolve(window.PDFLib);
    };

    script.onerror = () => reject("Failed to load pdf-lib");

    document.body.appendChild(script);
  });
}
