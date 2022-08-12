import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import Navbar from "../components/Navbar";
import { InputNumber } from "primereact/inputnumber";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const Recolectaruser = () => {
  const [cuentaReferencia, setCuentaReferencia] = useState("");
  const [cantidadCuenta, setCantidadCuenta] = useState(null);
  const [cuentasFollowers, setCuentasFollowers] = useState([]);
  const [region, setRegion] = useState("");
  const [open, setOpen] = useState(false);

  const getFollowersDeCuentaDeReferencia = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `http://localhost:5000/getCuentaReferencia?cuentaReferencia=${cuentaReferencia}&cantidadCuenta=${
          cantidadCuenta ?? ""
        }`
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.cuentas.length > 0) {
          setOpen(false);
          setCuentasFollowers([]);
          setCuentasFollowers(data);
          toast.success(
            "Se recuperaron los followers de la cuenta de referencia"
          );
        } else {
          setOpen(false);
          toast.error(
            "No se encontraron followers de la cuenta de referencia o faltaron datos por ingresar"
          );
        }
      }
    } catch (error) {
      setOpen(false);
      toast.error(
        "Error al recuperar los followers de la cuenta de referencia"
      );
    }
  };

  const handleExportButton = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(cuentasFollowers)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `followers${cuentaReferencia}${region}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <Navbar />
      <div style={{ margin: "10% 20% 0 42%" }}>
        <Card
          style={{ width: "44%", marginBottom: "2em", textAlign: "center" }}
        >
          <h1 style={{ color: "#34247c" }}>
            Recolectar seguidores de cuenta de referencia
          </h1>
          <InputText
            id="region"
            value={region}
            placeholder="Región de cuenta"
            type="search"
            onChange={(e) => setRegion(e.target.value)}
          />
          <InputText
            id="cuentaReferencia"
            value={cuentaReferencia}
            placeholder="Cuenta de referencia"
            type="search"
            style={{ marginTop: "10px" }}
            onChange={(e) => setCuentaReferencia(e.target.value)}
          />
          <InputNumber
            id="cantidadCuentas"
            value={cantidadCuenta}
            placeholder="N° de cuentas"
            type="search"
            label="N° de cuentas"
            style={{ marginTop: "10px" }}
            onChange={(e) => setCantidadCuenta(e.value)}
            mode="decimal"
          />
          <Button
            label="Recolectar"
            style={{ marginTop: 12 }}
            onClick={getFollowersDeCuentaDeReferencia}
          />
          <div>
            <Button
              label="Exportar"
              style={{ marginTop: 12 }}
              onClick={handleExportButton}
            />
          </div>
        </Card>
      </div>
      <Toaster />
      <Loader open={open} />
    </div>
  );
};
export default Recolectaruser;
