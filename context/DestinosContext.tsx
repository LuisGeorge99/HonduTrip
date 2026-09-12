import { createContext } from 'react';
import { Destino } from '../Models/Destino';

interface IDestinosContext {
    destinos: Destino[];
    destinoSeleccionado: Destino | null;
    seleccionarDestino: (destino: Destino) => void;
}

export const DestinosContext = createContext<IDestinosContext | undefined>(undefined);
