import MergeTool from "../components/tools/MergeTool";
import SplitTool from "../components/tools/SplitTool";
import PdfToJpgTool from "../components/tools/PdfToJpgTool";
import JpgToPdfTool from "../components/tools/JpgToPdfTool";
import EditPdfTool from "../components/tools/EditPdfTool";
import WatermarkTool from "../components/tools/WatermarkTool";
import RotatePdfTool from "../components/tools/RotatePdfTool";
import OrganizePdfTool from "../components/tools/OrganizePdfTool";
import PageNumberTool from "../components/tools/PageNumberTool";
import OcrPdfTool from "../components/tools/OcrPdfTool";
import ComparePdfTool from "../components/tools/ComparePdfTool";

import {
  Merge,
  Split,
  Image as ImageIcon,
  Edit,
  RotateCcw,
  Droplet,
  GitCompareArrows,
  ListOrdered,
  Search,
  File as FileIcon,
} from "lucide-react";

export const tools = [
  { name: "Merge PDF", slug: "merge", icon: Merge, component: MergeTool, description: "Combine multiple PDFs." },
  { name: "Split PDF", slug: "split", icon: Split, component: SplitTool, description: "Extract or split pages." },
  { name: "PDF → JPG", slug: "pdf-to-jpg", icon: ImageIcon, component: PdfToJpgTool, description: "Convert PDF page to JPG." },
  { name: "JPG → PDF", slug: "jpg-to-pdf", icon: ImageIcon, component: JpgToPdfTool, description: "Create a PDF from images." },
  { name: "Edit PDF", slug: "edit", icon: Edit, component: EditPdfTool, description: "Add text to PDF pages." },
  { name: "Watermark", slug: "watermark", icon: Droplet, component: WatermarkTool, description: "Stamp watermark across pages." },
  { name: "Rotate PDF", slug: "rotate", icon: RotateCcw, component: RotatePdfTool, description: "Rotate pages." },
  { name: "Organize Pages", slug: "organize", icon: FileIcon, component: OrganizePdfTool, description: "Drag to reorder PDF pages." },
  { name: "Page Numbers", slug: "pagenum", icon: ListOrdered, component: PageNumberTool, description: "Add page numbers." },
  // { name: "OCR", slug: "ocr", icon: Search, component: OcrPdfTool, description: "Extract text using OCR." },
  // { name: "Compare PDFs", slug: "compare", icon: GitCompareArrows, component: ComparePdfTool, description: "Visual diff of first pages." },
];
