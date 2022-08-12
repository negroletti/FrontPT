import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Recolectartweets = () => {
  return (
    <div>
      <Navbar />
      <Toaster />
    </div>
  );
};

export default Recolectartweets;
