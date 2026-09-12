import { createContext } from "react";
import { Paquete } from "../Models/Paquete";

interface IPaquetesContext{
    paquetes: Paquete[];
    paqueteSeleccionado: Paquete | null;
    seleccionarPaquete: (paquete: Paquete) => void;
}

export const PaquetesContext = createContext<IPaquetesContext | undefined>(undefined);