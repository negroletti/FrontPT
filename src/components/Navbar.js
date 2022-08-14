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
            label: "Filtrar usuarios",
            icon: "pi pi-fw pi-filter",
            command: () => {
              window.location.href = "/filtrarusuarios";
            },
          },
          {
            label: "Recolectar Tweets",
            icon: "pi pi-fw pi-twitter",
            command: () => {
              window.location.href = "/recolectartweets";
            },
          },
          {
            label: "Analizar set de datos",
            icon: "pi pi-fw pi-chart-bar",
            command: () => {
              window.location.href = "/analizardataset";
            },
          },
          {
            label: "Comparar sets de datos",
            icon: "pi pi-fw pi-table",
            command: () => {
              window.location.href = "/comparardataset";
            },
          },
        ]}
      />
    </div>
  );
};

export default Navbar;
