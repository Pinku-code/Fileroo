import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";

import Home from "./pages/Home";
import ToolsPage from "./pages/ToolsPage";   // ✅ CORRECT
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import SearchPage from "./pages/Search";
import ToolPage from "./pages/ToolPage";

import { tools } from "./config/tools";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "tools", element: <ToolsPage /> },   // ✅ FIXED

      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "contact", element: <Contact /> },
      { path: "search", element: <SearchPage /> },

      // Tool Routes
      ...tools.map((tool) => ({
        path: tool.slug,         // /merge /split /ocr etc
        element: <ToolPage tool={tool} />,
      })),
    ],
  },
]);
