import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import Navbar from "../components/Navbar";
import { InputNumber } from "primereact/inputnumber";
import toast, { Toaster } from "react-hot-toast";

const Recolectaruser = () => {
  const [cuentaReferencia, setCuentaReferencia] = useState("");
  const [cantidadCuenta, setCantidadCuenta] = useState(null);
  const [cuentasFollowers, setCuentasFollowers] = useState([]);

  const getFollowersDeCuentaDeReferencia = () => {
    try {
      const response = fetch(
        `http://localhost:5000/getCuentaReferencia?cuentaReferencia=${cuentaReferencia}&cantidadCuenta=${
          cantidadCuenta ?? ""
        }`
      );
      if (response.status === 200) {
        setCuentasFollowers([]);
        setCuentasFollowers(response.json());
        toast.success(
          "Se recuperaron los followers de la cuenta de referencia"
        );
        return response.json();
      }
    } catch (error) {
      toast.error(
        "Error al recuperar los followers de la cuenta de referencia"
      );
    }
  };

  const handleExportButton = (e) => {};
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
            id="cuentaReferencia"
            value={cuentaReferencia}
            placeholder="Cuenta de referencia"
            type="search"
            onChange={(e) => setCuentaReferencia(e.target.value)}
          />
          <InputNumber
            id="cantidadCuentas"
            value={cantidadCuenta}
            placeholder="N° de cuentas"
            type="search"
            label="N° de cuentas"
            style={{ marginTop: "10px" }}
            onChange={(e) => {
              console.log(e.value);
              setCantidadCuenta(e.value);
            }}
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
    </div>
  );
};
export default Recolectaruser;
