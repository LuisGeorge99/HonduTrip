import { createContext } from "react";
import { Transporte } from "../Models/Transporte";

interface ITransporteContext{
    transportes: Transporte[];
    transporteSeleccionado: Transporte | null;
    seleccionarTransporte: (transporte: Transporte) => void;
}

export const TransporteContext = createContext<ITransporteContext | undefined>(undefined);