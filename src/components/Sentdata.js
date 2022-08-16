import React from "react";
import { Dialog } from "primereact/dialog";

const Sentdata = ({
  open,
  palabra = null,
  tematica = null,
  setOpen,
  resultados,
}) => {
  return (
    <div>
      <style>
        {`
          table, th, td {
            border: 1px solid black;
            text-align: center;
          }
        `}
      </style>
      {palabra != null ? (
        <Dialog
          header={'Sentimentos evocados por la palabra: "' + palabra + '"'}
          visible={open}
          draggable={false}
          resizable={false}
          onHide={() => {
            setOpen(false);
          }}
          style={{ width: "30%" }}
        >
          <table>
            <thead>
              <tr>
                <th>Cuenta de referencia</th>
                <th>Region de cuenta de referencia</th>
                <th>Positivos</th>
                {resultados.neutros ? <th>Neutros</th> : null}
                <th>Negativos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{resultados.cuenta}</td>
                <td>{resultados.region}</td>
                <td>{resultados.positivos}</td>
                {resultados.neutros ? <td>{resultados.neutros}</td> : null}
                <td>{resultados.negativos}</td>
              </tr>
            </tbody>
          </table>
        </Dialog>
      ) : (
        <Dialog
          header={'Sentimentos evocados por la temática: "' + tematica + '"'}
          visible={open}
          draggable={false}
          resizable={false}
          onHide={() => {
            setOpen(false);
          }}
          style={{ width: "30%" }}
        >
          <table>
            <tr>
              <th>Cuenta de referencia</th>
              <th>Region de cuenta de referencia</th>
              <th>Positivos</th>
              {resultados.neutros ? <th>Neutros</th> : null}
              <th>Negativos</th>
            </tr>
            <tr>
              <td>{resultados.cuenta}</td>
              <td>{resultados.region}</td>
              <td>{resultados.positivos}</td>
              {resultados.neutros ? <td>{resultados.neutros}</td> : null}
              <td>{resultados.negativos}</td>
            </tr>
          </table>
        </Dialog>
      )}
    </div>
  );
};

export default Sentdata;
