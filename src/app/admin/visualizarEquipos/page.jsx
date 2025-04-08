"use client";

import Equipos from "../../../components/visualizarEquiposAdmin";
import { BrowserRouter } from 'react-router-dom';

export default function creacionEquipo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <BrowserRouter>
      <Equipos />
      </BrowserRouter>
      
    </div>
  );
}