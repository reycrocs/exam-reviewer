import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import { store } from "./store/store"; // ✅ Import Redux store
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
    <Provider store={store}> {/* ✅ Wrap Redux Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
