import { createContext } from 'react';
import { Destino } from '../Models/Destino';

export const DestinosContext = createContext({
    // Se puede quedar con un arreglo vacío o con la plantilla base
    destinos: [] as Destino[], 
    destinoSeleccionado: { id: '', nombre: '', pais: '', imagen: '', descripcion: '' } as Destino | null,
    seleccionarDestino: (destino: Destino) => {}
});
