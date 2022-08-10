import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";

const Loader = ({ open }) => {
  return (
    <div>
      <Dialog
        header="Cargando"
        visible={open}
        resizable={false}
        draggable={false}
        closable={false}
      >
        <ProgressSpinner />
      </Dialog>
    </div>
  );
};

export default Loader;
