import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Recolectaruser from "./components/Recolectaruser";
import Analizardataset from "./components/Analizardataset";
import Filtrarusuarios from "./components/Filtrarusuarios";
import Recolectartweets from "./components/Recolectartweets";
import Comparardataset from "./components/Comparardataset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recolectaruser" element={<Recolectaruser />} />
      <Route path="/analizardataset" element={<Analizardataset />} />
      <Route path="/filtrarusuarios" element={<Filtrarusuarios />} />
      <Route path="/recolectartweets" element={<Recolectartweets />} />
      <Route path="/comparardataset" element={<Comparardataset />} />
    </Routes>
  </BrowserRouter>
);
