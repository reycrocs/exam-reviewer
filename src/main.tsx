import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import MainContent from "./views/Common/Layout/MainContent";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <MainContent />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
