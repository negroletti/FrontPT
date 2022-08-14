import React, { useState } from "react";
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
  const [region, setRegion] = useState("");
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const getFollowersDeCuentaDeReferencia = async () => {
    try {
      setOpen(true);
      const response = await fetch(
        `http://localhost:5000/getCuentaReferencia?cuentaReferencia=${cuentaReferencia}&cantidadCuenta=${
          cantidadCuenta ?? ""
        }&region=${region}`
      );
      if (response.status === 200) {
        setOpen(false);
        setFlag(true);
        toast.success(
          "Se recuperaron los followers de la cuenta de referencia"
        );
      }
    } catch (error) {
      setOpen(false);
      toast.error(
        "Error al recuperar los followers de la cuenta de referencia"
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0",
          marginTop: "8%",
        }}
      >
        <Card>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
              disabled={cuentaReferencia === "" || cantidadCuenta === null}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                label="Exportar"
                style={{ marginTop: 12 }}
                onClick={() => {
                  window.location.href = `http://127.0.0.1:5000/download?fileName=${cuentaReferencia}.json`;
                }}
                disabled={!flag}
              />
            </div>
          </div>
        </Card>
      </div>
      <Toaster />
      <Loader open={open} />
    </div>
  );
};
export default Recolectaruser;
