import Navbar from "./Navbar";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import toast from "react-hot-toast";

const Comparardataset = () => {
  const [dataset1, setDataset1] = useState("");
  const [dataset2, setDataset2] = useState("");
  const chooseOptions = {
    label: "Elegir",
    icon: "pi pi-fw pi-plus",
    style: { width: "50%", marginBottom: "5%" },
  };
  const uploadOptions = {
    label: "Cargar set de datos",
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
          <h1 style={{ color: "#34247c" }}>Set de datos n°1</h1>
          <FileUpload
            name="fileUpload"
            customUpload
            chooseOptions={chooseOptions} //botones
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            uploadHandler={uploadHandler} //handler de file upload
            onUpload={onUpload}
            accept="application/json" //?? Ver mime types aqui https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
            maxFileSize={1000000} //esta en bytes
            emptyTemplate={<p className="m-0">Arrastra aquí el archivo</p>}
          />
        </Card>
        <Card
          style={{
            marginBottom: "2em",
            textAlign: "center",
            marginLeft: "2%",
          }}
        >
          <h1 style={{ color: "#34247c" }}>Set de datos n°2</h1>
          <FileUpload
            name="fileUpload"
            customUpload
            chooseOptions={chooseOptions} //botones
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            uploadHandler={uploadHandler} //handler de file upload
            onUpload={onUpload}
            accept="text/plain" //?? Ver mime types aqui https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
            maxFileSize={1000000} //esta en bytes
            emptyTemplate={<p className="m-0">Arrastra aquí el archivo</p>}
          />
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.01%",
        }}
      >
        <Card
          style={{
            marginBottom: "2em",
            textAlign: "center",
          }}
        >
          <Button
            label="Analizar con Sentiment Spanish"
            disabled={dataset1 === "" && dataset2 === ""}
          />
          <Button
            style={{ marginLeft: "1em" }}
            label="Analizar con AFINN"
            disabled={dataset1 === "" && dataset2 === ""}
          />
          <Button
            style={{ marginLeft: "1em" }}
            label="Analizar con NLTK"
            disabled={dataset1 === "" && dataset2 === ""}
          />
          <Button
            style={{ marginLeft: "1em" }}
            label="Analizar con TextBlob"
            disabled={dataset1 === "" && dataset2 === ""}
          />
        </Card>
      </div>
    </div>
  );
};

export default Comparardataset;
