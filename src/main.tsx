import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import MainContent from "./views/Common/Layout/MainContent";

const App: React.FC = () => {
  const [devToolsOpen] = useState(false);

  useEffect(() => {
    const disableRightClick = (event: MouseEvent) => event.preventDefault();

    const disableDevToolsShortcuts = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
        (event.ctrlKey && event.key === "U") ||
        event.key === "F12"
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevToolsShortcuts);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevToolsShortcuts);
    };
  }, [devToolsOpen]);

  if (devToolsOpen) return null;

  return (
    <div className="h-screen flex flex-col">
      <MainContent />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
