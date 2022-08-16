import React, { useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Loader from "../components/Loader";

const Recolectartweets = () => {
  const [tweet, setTweet] = useState("");
  const [open, setOpen] = useState(false);

  const chooseOptions = {
    label: "Elegir archivo",
    icon: "pi pi-fw pi-plus",
    style: { width: "50%", marginBottom: "5%" },
  };
  const uploadOptions = {
    label: "Subir y recolectar Tweets",
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
    const formData = new FormData();
    const file = event.files[0];

    formData.append("file", file);
    try {
      setOpen(true);
      const response = await fetch("http://127.0.0.1:5000/getTweets", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setOpen(false);
        setTweet("");
        console.log(data);
        setTweet(data);
      } else {
        setOpen(false);
        toast.error("API no responde");
      }
    } catch (error) {
      setOpen(false);
      toast.error("Error al cargar el archivo");
    }
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
          <h1 style={{ color: "#34247c" }}>
            Recolectar tweets de dataset de usuarios
          </h1>
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
          <Button
            label="Exportar tweets"
            style={{ width: "50%", marginTop: "1em" }}
            onClick={() => {
              window.location.href = `http://127.0.0.1:5000/download?fileName=${tweet.name}`;
            }}
            disabled={tweet === ""}
          />
        </Card>
        <Toaster />
        <Loader open={open} />
      </div>
    </div>
  );
};

export default Recolectartweets;
