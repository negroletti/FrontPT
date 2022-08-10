import React from "react";
import { Menubar } from "primereact/menubar";

const Navbar = () => {
  return (
    <div>
      <h1 style={{ color: "#ffffff" }}>
        Análisis de comentarios en temáticas de contingencia en territorios
        específicos de Chile{" "}
      </h1>
      <Menubar
        model={[
          {
            label: "Recolectar seguidores",
            icon: "pi pi-fw pi-users",
            command: () => {
              window.location.href = "/recolectaruser";
            },
          },
          {
            label: "Analizar set de datos",
            icon: "pi pi-fw pi-chart-bar",
            command: () => {
              window.location.href = "/analizardataset";
            },
          },
        ]}
      />
    </div>
  );
};

export default Navbar;
