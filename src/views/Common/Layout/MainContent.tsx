import { Routes, Route } from "react-router-dom";
import LandingPage from "../../LANDING PAGE/landingpage";
import WEB001 from "../../WEB001/WEB001";
import WEB002 from "../../WEB002/WEB002";
import Unauthorize from "../../Error/Unauthorize";
import { URL } from "../../../helpers/const";

export default function MainContent() {
    return (
      <div>
        <Routes>
            <Route path={URL.LANDINGPAGE} element={<LandingPage />} />
            <Route path={URL.WEB001} element={<WEB001 />} />
            <Route path={URL.WEB002} element={<WEB002 />} />
            <Route path={URL.UNAUTHORIZED} element={<Unauthorize />} />
        </Routes>
      </div>
    );
  }
  