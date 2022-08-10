import React from "react";
import Navbar from "../components/Navbar";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";

const Analizardataset = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: "10% 20% 0 42%" }}>
        <Card
          style={{ width: "44%", marginBottom: "2em", textAlign: "center" }}
        >
          <FileUpload name="demo" url="./upload"></FileUpload>
        </Card>
      </div>
    </div>
  );
};

export default Analizardataset;
