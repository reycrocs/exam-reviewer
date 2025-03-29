import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../../LANDING PAGE/landingpage";
import WEB002 from "../../WEB002/WEB002";
import { URL } from "../../../helpers/const";

export default function MainContent() {
    return (
      <div>
        <Routes>
            <Route path={URL.LANDINGPAGE} element={<LandingPage />} />
            <Route path={URL.WEB002} element={<WEB002 />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }
  