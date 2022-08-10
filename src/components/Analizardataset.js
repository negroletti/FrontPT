import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";

const Analizardataset = () => {
  const [file, setFile] = useState(null);
  const chooseOptions = { label: "Cargar dataset", icon: "pi pi-upload" };
  return (
    <div>
      <Navbar />
      <div style={{ margin: "10% 20% 0 42%" }}>
        <Card
          style={{ width: "44%", marginBottom: "2em", textAlign: "center" }}
        >
          <h1 style={{ color: "#34247c" }}>Analizar dataset</h1>
          <FileUpload
            chooseOptions={chooseOptions}
            name="file"
            onChange={(e) => {
              console.log(e.files);
              // setFile(e.target.files);
            }}
            style={{ marginTop: "10px" }}
            auto
          />
        </Card>
      </div>
    </div>
  );
};

export default Analizardataset;
