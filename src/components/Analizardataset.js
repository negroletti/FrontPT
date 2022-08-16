import React, { useState } from "react";
import { Button } from "primereact/button";
import Navbar from "../components/Navbar";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import toast, { Toaster } from "react-hot-toast";
import Sentdata from "./Sentdata";
import Loader from "./Loader";
import CargarArregloPalabras from "./CargarArregloPalabras";

const Analizardataset = () => {
  const [dataset, setDataset] = useState("");
  const [palabra, setPalabra] = useState("");
  const [ocurrencias, setOcurrencias] = useState(null);
  const [openP, setOpenP] = useState(false);
  const [open, setOpen] = useState(false);
  const [tematica, setTematica] = useState("");
  const [openW, setOpenW] = useState(false);
  const [conjuntoPalabras, setConjuntoPalabras] = useState([]);
  const [resultados, setResultados] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
      const response = await fetch("http://127.0.0.1:5000/loadDataset", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setDataset(data.name);
        toast.success("Archivo cargado");
      } else {
        toast.error("Error al cargar el archivo");
      }
    } catch (error) {
      toast.error("Error al cargar el archivo");
    }
  };
  const contarOcurrencias = async (conjunto) => {
    if (conjunto === false) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/contarOcurrencias?file=${dataset}&palabra=${palabra}&conjunto=false`
        );
        if (response.status === 200) {
          const data = await response.json();
          setOcurrencias(data.ocurrencias);
          setOpenP(true);
        }
      } catch (error) {
        toast.error("Error al buscar la palabra");
      }
    } else {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/contarOcurrencias?file=${dataset}&palabra=${conjuntoPalabras}&conjunto=true&tematica=${tematica}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setOcurrencias(data.ocurrencias);
          setOpenP(true);
        }
      } catch (error) {
        toast.error("Error al buscar el arrelgo de palabrs");
      }
    }
  };
  const sentiment = async (model) => {
    if (conjuntoPalabras.length === 0) {
      try {
        setOpen(true);
        const response = await fetch(
          `http://127.0.0.1:5000/${model}?dataSet=${dataset}&palabra=${palabra}&modelo=${model}&conjunto=false`
        );
        if (response.status === 200) {
          setOpen(false);
          const data = await response.json();
          setResultados(data);
          setOpenModal(true);
        } else {
          setOpen(false);
          toast.error("Error al analizar el conjunto de datos");
        }
      } catch (error) {
        setOpen(false);
        toast.error("Error al analizar el conjunto de datos");
      }
    } else {
      try {
        setOpen(true);
        const response = await fetch(
          `http://127.0.0.1:5000/${model}?dataSet=${dataset}&palabra=${conjuntoPalabras}&modelo=${model}&tematica=${tematica}&conjunto=true`
        );
        if (response.status === 200) {
          setOpen(false);
          const data = await response.json();
          setResultados(data);
          setOpenModal(true);
        } else {
          setOpen(false);
          toast.error("Error al analizar el conjunto de datos");
        }
      } catch (error) {
        setOpen(false);
        toast.error("Error al analizar el conjunto de datos");
      }
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
          <h1 style={{ color: "#34247c" }}>Analizar conjunto de datos</h1>
          <FileUpload
            name="fileUpload"
            customUpload
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            uploadHandler={uploadHandler}
            onUpload={onUpload}
            onCancel={() => {
              setDataset("");
            }}
            accept="application/json"
            maxFileSize={1000000}
            emptyTemplate={<p className="m-0">Arrastra aquí el archivo</p>}
          />
          <div>
            <InputText
              id="palabra"
              value={palabra}
              placeholder="Palabra a buscar"
              type="search"
              style={{ marginTop: "10px" }}
              onChange={(e) => {
                setPalabra(e.target.value);
                setOpenP(false);
              }}
              disabled={dataset === "" || conjuntoPalabras.length > 0}
            />
            <Button
              style={{ marginTop: "1em", marginLeft: "1em" }}
              label="Buscar palabra en conjunto de datos"
              disabled={palabra === "" || conjuntoPalabras.length > 0}
              onClick={() => {
                contarOcurrencias(false);
              }}
            />
            <div>
              <Button
                style={{ marginTop: "1em", marginLeft: "1em" }}
                label="Cargar arreglo de palabras para buscar en conjunto de datos"
                disabled={dataset === "" || palabra != ""}
                onClick={() => {
                  setPalabra("");
                  setOpenW(true);
                }}
              />
              <InputText
                id="tematica"
                value={tematica}
                placeholder="Temática de array"
                type="search"
                style={{ marginTop: "10px", marginLeft: "1em" }}
                onChange={(e) => {
                  setTematica(e.target.value);
                }}
                disabled={conjuntoPalabras.length === 0 || palabra != ""}
              />
              <Button
                style={{ marginTop: "1em", marginLeft: "1em" }}
                label="Buscar palabras en conjunto de datos"
                disabled={
                  conjuntoPalabras.length === 0 ||
                  palabra != "" ||
                  tematica === ""
                }
                onClick={() => {
                  contarOcurrencias(true);
                }}
              />
            </div>
            <div>
              {openP ? <p>Cantidad de Tweets: {ocurrencias}</p> : <p></p>}
            </div>
          </div>
          <Button
            style={{ marginTop: "1em" }}
            label="Analizar con Sentiment Spanish"
            disabled={ocurrencias > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentSpanish");
            }}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con AFINN"
            disabled={ocurrencias > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentAFINN");
            }}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con NLTK"
            disabled={ocurrencias > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentNLTK");
            }}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con TextBlob"
            disabled={ocurrencias > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentTB");
            }}
          />
        </Card>
      </div>
      {conjuntoPalabras.length == 0 ? (
        <Sentdata
          open={openModal}
          setOpen={setOpenModal}
          palabra={palabra}
          resultados={resultados}
        />
      ) : (
        <Sentdata
          open={openModal}
          setOpen={setOpenModal}
          tematica={tematica}
          resultados={resultados}
        />
      )}
      <CargarArregloPalabras
        open={openW}
        setOpen={setOpenW}
        setConjuntoPalabras={setConjuntoPalabras}
      />
      <Toaster />
      <Loader open={open} />
    </div>
  );
};

export default Analizardataset;
