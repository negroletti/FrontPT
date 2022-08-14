import React, { useState } from "react";
import { Button } from "primereact/button";
import Navbar from "../components/Navbar";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import toast from "react-hot-toast";
import Tabla from "./Tabla";

const Analizardataset = () => {
  const [dataset, setDataset] = useState("");
  const chooseOptions = {
    label: "Elegir",
    icon: "pi pi-fw pi-plus",
    style: { width: "50%", marginBottom: "5%" },
  };
  const uploadOptions = {
    label: "Cargar y analizar set de datos",
    icon: "pi pi-upload",
    className: "p-button-success",
    style: { width: "50%", marginBottom: "5%" },
  };
  const cancelOptions = {
    label: "Cancelar",
    icon: "pi pi-times",
    className: "p-button-danger",
    style: { width: "50%", marginBottom: "5%" },
  };

  const onUpload = () => {
    toast.success("Archivo cargado");
  };

  const uploadHandler = async (event) => {
    // console.log(event);
    const formData = new FormData();
    const file = event.files[0];

    formData.append("file", file);
    // const response = await fetch('rutaApi', { //?? asi se hace consulta a api
    //   method: 'POST',
    //   body: formData
    // });
    // const resultado = await response.json();
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4%",
        }}
      >
        <Card
          style={{
            marginBottom: "2em",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#34247c" }}>Analizar dataset</h1>
          <FileUpload
            name="fileUpload"
            customUpload
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            uploadHandler={uploadHandler}
            onUpload={onUpload}
            accept="application/json"
            maxFileSize={1000000}
            emptyTemplate={<p className="m-0">Arrastra aquí el archivo</p>}
          />
          <Button
            style={{ marginTop: "1em" }}
            label="Analizar con Sentiment Spanish"
            disabled={dataset === ""}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con AFINN"
            disabled={dataset === ""}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con NLTK"
            disabled={dataset === ""}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con TextBlob"
            disabled={dataset === ""}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Prueba de Sentiment Spanish"
          />
        </Card>
      </div>
    </div>
  );
};

export default Analizardataset;
