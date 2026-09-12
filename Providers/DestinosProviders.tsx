import React, { useContext, useState } from 'react'
import { ViewReact } from '../Models/ViewReact'
import { Destino } from '../Models/Destino'
import { View } from 'react-native';
import { DestinosContext } from '../context/DestinosContext';


const MIS_DESTINOS: Destino[] = [
        { id: '1', nombre: 'Cancún', pais: 'México', imagen: 'https://randomtrip.es/wp-content/uploads/2024/07/letras-cancun-playa-chacmool.jpg', descripcion: 'Playas de arena blanca y mar turquesa.' },
        { id: '2', nombre: 'París', pais: 'Francia', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3JVA2cARIOacY8ATwUJoS6fBgmCfBWXoSQyfQ8czQT3Qj8T5cTtY-XcU&s=10', descripcion: 'La ciudad de la luz, el arte y la buena comida.' },
        { id: '3', nombre: 'Tokio', pais: 'Japón', imagen: 'https://media.admagazine.com/photos/618a6025ac089e092dcbfe42/master/w_1600%2Cc_limit/88202.jpg', descripcion: 'Una mezcla perfecta entre tradición y tecnología futurista.' },
];

export default function DestinosProvider({ children }: ViewReact) {
    const [destinos, setDestinos] = useState<Destino[]>(MIS_DESTINOS);
    const [destinoSeleccionado, setDestinoSeleccionado] = useState<Destino | null>(null);

    const seleccionarDestino = (destino: Destino) => {
        setDestinoSeleccionado(destino);
    };

    return (
        <View style={{ flex: 1 }}>
            <DestinosContext.Provider value={{ destinos, destinoSeleccionado, seleccionarDestino }}>
                {children}
            </DestinosContext.Provider>
        </View>
    );
}

export const useDestinos = () => {
    return useContext(DestinosContext)!;
};
