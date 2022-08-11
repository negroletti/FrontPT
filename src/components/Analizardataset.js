import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import toast from "react-hot-toast";

const Analizardataset = () => {
  const chooseOptions = {
    label: "Elegir",
    icon: "pi pi-fw pi-plus",
    style: { width: "50%", marginBottom: "5%" },
  };
  const uploadOptions = {
    label: "Subir",
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

    formData.append("file", file); //?? primer argumento es nombre de la key y el segundo es el archivo
    // formData.append("otherValue", 1); //?? Asi se agregarian mas argumentos a la consulta

    // for (var pair of formData.entries()) { //?? como hacer console log a un formData
    //     console.log(pair[0] + ", " + pair[1]);
    // }
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
    </div>
  );
};

export default Analizardataset;
