import React, { useState } from "react";
import { Button } from "primereact/button";
import Navbar from "../components/Navbar";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import toast, { Toaster } from "react-hot-toast";
import Compdata from "./Compdata";
import Loader from "./Loader";
import CargarArregloPalabras from "./CargarArregloPalabras";

const Comparardataset = () => {
  const [dataset1, setDataset1] = useState("");
  const [dataset2, setDataset2] = useState("");
  const [palabra, setPalabra] = useState("");
  const [resultados, setResultados] = useState("");
  const [resultados2, setResultados2] = useState("");
  const [tematica, setTematica] = useState("");

  const [conjuntoPalabras, setConjuntoPalabras] = useState([]);

  const [ocurrencias1, setOcurrencias1] = useState(null);
  const [ocurrencias2, setOcurrencias2] = useState(null);

  const [openP, setOpenP] = useState(false);
  const [open, setOpen] = useState(false);
  const [openW, setOpenW] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const uploadHandler = async (event, n) => {
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
        n == 1 ? setDataset1(data.name) : setDataset2(data.name);
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
          `http://127.0.0.1:5000/contarOcurrencias?file=${dataset1}&palabra=${palabra}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setOcurrencias1(data.ocurrencias);
        } else {
          toast.error("Error al contar las ocurrencias");
        }
      } catch (error) {
        toast.error("Error al buscar la palabra en dataset 1");
      }
      try {
        const response2 = await fetch(
          `http://127.0.0.1:5000/contarOcurrencias?file=${dataset2}&palabra=${palabra}`
        );
        if (response2.status === 200) {
          const data2 = await response2.json();
          setOcurrencias2(data2.ocurrencias);
          setOpenP(true);
        }
      } catch (error) {
        toast.error("Error al buscar la palabra en dataset 2");
      }
    } else {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/contarOcurrencias?file=${dataset1}&palabra=${conjuntoPalabras}&conjunto=true&tematica=${tematica}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setOcurrencias1(data.ocurrencias);
        } else {
          toast.error("Error al contar las ocurrencias");
        }
      } catch (error) {
        toast.error("Error al buscar la palabra en dataset 1");
      }
      try {
        const response2 = await fetch(
          `http://127.0.0.1:5000/contarOcurrencias?file=${dataset2}&palabra=${conjuntoPalabras}&conjunto=true&tematica=${tematica}`
        );
        if (response2.status === 200) {
          const data2 = await response2.json();
          setOcurrencias2(data2.ocurrencias);
          setOpenP(true);
        } else {
          toast.error("Error al contar las ocurrencias");
        }
      } catch (error) {
        toast.error("Error al buscar la palabra en dataset 2");
      }
    }
  };
  const sentiment = async (model) => {
    if (conjuntoPalabras.length === 0) {
      try {
        setOpen(true);
        const response1 = await fetch(
          `http://127.0.0.1:5000/${model}?dataSet=${dataset1}&palabra=${palabra}&modelo=${model}&conjunto=false`
        );
        if (response1.status === 200) {
          const data = await response1.json();
          setResultados(data);
        } else {
          setOpen(false);
          toast.error("Error al analizar el dataset");
        }
      } catch (error) {
        setOpen(false);
        toast.error("Error al analizar el dataset");
      }
      try {
        const response2 = await fetch(
          `http://127.0.0.1:5000/${model}?dataSet=${dataset2}&palabra=${palabra}&modelo=${model}&conjunto=false`
        );
        if (response2.status === 200) {
          setOpen(false);
          const data = await response2.json();
          setResultados2(data);
          setOpenModal(true);
        } else {
          setOpen(false);
          toast.error("Error al analizar el dataset");
        }
      } catch (error) {
        setOpen(false);
        toast.error("Error al analizar el set de datos");
      }
    } else {
      try {
        setOpen(true);
        const response1 = await fetch(
          `http://127.0.0.1:5000/${model}?dataSet=${dataset1}&palabra=${conjuntoPalabras}&modelo=${model}&conjunto=true&tematica=${tematica}`
        );
        if (response1.status === 200) {
          const data = await response1.json();
          setResultados(data);
        } else {
          setOpen(false);
          toast.error("Error al analizar el dataset");
        }
      } catch (error) {
        setOpen(false);
        toast.error("Error al analizar el dataset");
      }
      try {
        const response2 = await fetch(
          `http://127.0.0.1:5000/${model}?dataSet=${dataset2}&palabra=${conjuntoPalabras}&modelo=${model}&conjunto=true&tematica=${tematica}`
        );
        if (response2.status === 200) {
          setOpen(false);
          const data = await response2.json();
          setResultados2(data);
          setOpenModal(true);
        } else {
          setOpen(false);
          toast.error("Error al analizar el dataset");
        }
      } catch (error) {
        setOpen(false);
        toast.error("Error al analizar el dataset");
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
          <h1 style={{ color: "#34247c" }}>Conjunto de datos n°1</h1>
          <FileUpload
            name="fileUpload"
            customUpload
            chooseOptions={chooseOptions} //botones
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
            uploadHandler={(e) => uploadHandler(e, 1)} //handler de file upload
            onUpload={onUpload}
            onCancel={() => {
              setDataset1("");
            }}
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
            uploadHandler={(e) => uploadHandler(e, 2)} //handler de file upload
            onUpload={onUpload}
            onCancel={() => {
              setDataset2("");
            }}
            accept="application/json" //?? Ver mime types aqui https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
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
            marginLeft: "2%",
          }}
        >
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
            disabled={
              dataset1 === "" || dataset2 === "" || conjuntoPalabras.length > 0
            }
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Buscar palabra en ambos sets de datos"
            disabled={palabra === "" || conjuntoPalabras.length > 0}
            onClick={() => {
              setConjuntoPalabras([]);
              contarOcurrencias(false);
            }}
          />
          <div>
            <Button
              style={{ marginTop: "1em", marginLeft: "1em" }}
              label="Cargar arreglo de palabras para buscar en ambos conjuntos de datos"
              disabled={palabra != "" || dataset1 === "" || dataset2 === ""}
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
              label="Buscar array en ambos conjuntos de datos"
              disabled={
                palabra != "" ||
                tematica === "" ||
                conjuntoPalabras.length === 0
              }
              onClick={() => {
                contarOcurrencias(true);
              }}
            />
          </div>
          <div>
            {openP ? (
              <div>
                <p>Cantidad de Tweets set de datos 1: {ocurrencias1}</p>
                <p>Cantidad de Tweets set de datos 2: {ocurrencias2}</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
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
            style={{ marginTop: "1em" }}
            label="Analizar con Sentiment Spanish"
            disabled={ocurrencias1 > 0 && ocurrencias2 > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentSpanish");
            }}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con AFINN"
            disabled={ocurrencias1 > 0 && ocurrencias2 > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentAFINN");
            }}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con NLTK"
            disabled={ocurrencias1 > 0 && ocurrencias2 > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentNLTK");
            }}
          />
          <Button
            style={{ marginTop: "1em", marginLeft: "1em" }}
            label="Analizar con TextBlob"
            disabled={ocurrencias1 > 0 && ocurrencias2 > 0 ? false : true}
            onClick={() => {
              setResultados("");
              sentiment("sentTB");
            }}
          />
        </Card>
      </div>
      {conjuntoPalabras.length == 0 ? (
        <Compdata
          open={openModal}
          setOpen={setOpenModal}
          palabra={palabra}
          resultados={resultados}
          resultadosb={resultados2}
        />
      ) : (
        <Compdata
          open={openModal}
          setOpen={setOpenModal}
          tematica={tematica}
          resultados={resultados}
          resultadosb={resultados2}
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

export default Comparardataset;
