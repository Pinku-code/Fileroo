import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { loadPdfLib } from "../../lib/loadPdfLib";
import { loadPdfJs } from "../../lib/loadPdfJs";

export default function RootLayout() {
    // Load PDF-lib
    useEffect(() => {
        loadPdfLib()
            .then(() => console.log("PDFLib Loaded"))
            .catch(console.error);
    }, []);

    // Load PDF.js
    useEffect(() => {
        loadPdfJs()
            .then(() => console.log("PDF.js Loaded"))
            .catch(console.error);
    }, []);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
