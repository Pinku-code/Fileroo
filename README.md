# Fileroo — Local-First PDF Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
A fast, private, browser-based PDF toolkit built with React and Vite. Merge, split, convert, watermark, reorder, OCR, compare — all without uploading your files to a server.

**Live Demo** (when deployed on Vercel): _replace this with your actual URL_  
<https://fileroo.vercel.app>

## 🚀 Features

- **Merge PDF** — Combine multiple PDFs into one  
- **Split PDF** — Extract specific pages or page ranges  
- **PDF → JPG** — Convert any PDF page to a high-resolution image  
- **JPG → PDF** — Build a PDF out of image files  
- **Edit PDF** — Add text to existing pages  
- **Watermark** — Stamp custom text (e.g. “SAMPLE”) across all pages  
- **Rotate PDF** — Rotate pages by 90°, 180°, or 270°  
- **Organize Pages** — Drag & drop page thumbnails to reorder pages  
- **Add Page Numbers** — Number pages from a chosen starting index  
- **OCR** — Extract text from PDF using Tesseract.js  
- **Compare PDFs** — Visually diff first pages of two PDFs using pixelmatch  

## 🔧 Tech Stack

- **React** (17/18/19)  
- **Vite** for fast dev and build  
- **pdf-lib** for PDF manipulation  
- **PDF.js** for rendering PDF pages  
- **Tesseract.js** for OCR  
- **pixelmatch** for pixel-level comparison  
- **Clerk** for authentication (optional but integrated)  
- **React Dropzone** for drag-and-drop file upload  
- **File Saver** for download support  

## 💻 Getting Started

### Prerequisites

- Node.js (16+ recommended)  
- npm or Yarn  
- Clerk account + publishable key (if you want to use auth)

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/Pinku-code/Fileroo.git
   cd Fileroo
