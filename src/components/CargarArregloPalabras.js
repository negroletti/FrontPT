import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import toast, { Toaster } from "react-hot-toast";

const CargarArregloPalabras = ({ open, setOpen, setConjuntoPalabras }) => {
  const chooseOptions = {
    label: "Elegir",
    icon: "pi pi-fw pi-plus",
    style: { width: "50%", marginBottom: "5%" },
  };
  const uploadOptions = {
    label: "Cargar conjunto de datos",
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
      const response = await fetch("http://127.0.0.1:5000/loadWords", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setConjuntoPalabras(data.words);
        toast.success("Archivo cargado");
        setOpen(false);
      } else {
        toast.error("Error al cargar el archivo");
      }
    } catch (error) {
      toast.error("Error al cargar el archivo");
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
      <Dialog
        header="Cargar conjunto de palabras"
        visible={open}
        draggable={false}
        resizable={false}
        onHide={() => {
          setOpen(false);
        }}
        style={{ marginBottom: "2em", textAlign: "center" }}
      >
        <FileUpload
          name="fileUpload"
          customUpload
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
          onUpload={onUpload}
          uploadHandler={uploadHandler}
          accept="text/plain"
          maxFileSize={1000000}
          emptyTemplate={<p className="m-0"> Arrastra aquí el archivo</p>}
        />
      </Dialog>
      <Toaster />
    </div>
  );
};

export default CargarArregloPalabras;
