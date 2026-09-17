import { useContext, useState } from "react";
import { Paquete } from "../Models/Paquete";
import { ViewReact } from "../Models/ViewReact";
import { View } from "react-native";
import React from "react";
import { PaquetesContext } from "../context/PaquetesContext";

const MIS_PAQUETES: Paquete[] = [
    { 
        id: '1', 
        nombre: 'Cancún Express Playa', 
        estadia: 3, 
        moneda: 'HNL', 
        precio: 12500, 
        descripcion: 'Estadía express frente al mar turquesa con desayunos buffet.', 
        imagen: 'https://randomtrip.es/wp-content/uploads/2024/07/letras-cancun-playa-chacmool.jpg' 
    },
    { 
        id: '2', 
        nombre: 'Cancún Todo Incluido Premium', 
        estadia: 5, 
        moneda: 'HNL', 
        precio: 24900, 
        descripcion: 'Hospedaje de lujo, barra libre, cenas a la carta y pase a Chichén Itzá.', 
        imagen: 'https://randomtrip.es/wp-content/uploads/2024/07/letras-cancun-playa-chacmool.jpg' 
    },

    { 
        id: '3', 
        nombre: 'París Esencial y Torre Eiffel', 
        estadia: 4, 
        moneda: 'HNL', 
        precio: 35000, 
        descripcion: 'Hotel céntrico ideal para caminatas, incluye entrada prioritaria a la Torre Eiffel.', 
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3JVA2cARIOacY8ATwUJoS6fBgmCfBWXoSQyfQ8czQT3Qj8T5cTtY-XcU&s=10' 
    },
    { 
        id: '4', 
        nombre: 'París Romance & Museo del Louvre', 
        estadia: 6, 
        moneda: 'HNL', 
        precio: 48500, 
        descripcion: 'Hospedaje boutique histórico, crucero nocturno por el río Sena y tickets al Louvre.', 
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3JVA2cARIOacY8ATwUJoS6fBgmCfBWXoSQyfQ8czQT3Qj8T5cTtY-XcU&s=10' 
    },

    { 
        id: '5', 
        nombre: 'Tokio Tecnológico y Akihabara', 
        estadia: 4, 
        moneda: 'HNL', 
        precio: 57000, 
        descripcion: 'Hospedaje futurista en el corazón de Akihabara, ideal para amantes del anime y gadgets.', 
        imagen: 'https://media.admagazine.com/photos/618a6025ac089e092dcbfe42/master/w_1600%2Cc_limit/88202.jpg' 
    },
    { 
        id: '6', 
        nombre: 'Gran Tour Tokio Tradición & Modernidad', 
        estadia: 7, 
        moneda: 'HNL', 
        precio: 65000, 
        descripcion: 'Semana completa combinando templos antiguos de Asakusa y la vida nocturna de Shibuya.', 
        imagen: 'https://media.admagazine.com/photos/618a6025ac089e092dcbfe42/master/w_1600%2Cc_limit/88202.jpg' 
    }
];

export default function PaquetesProvider({children}: ViewReact){

    const [paquetes, setPaquetes] = useState<Paquete[]>(MIS_PAQUETES);
    const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<Paquete | null> (null);

    const seleccionarPaquete = (paquete: Paquete) => {
        setPaqueteSeleccionado(paquete);
    }

    return(
        <View style={{ flex: 1 }}>
            <PaquetesContext.Provider value={{ paquetes, paqueteSeleccionado, seleccionarPaquete }}>
                {children}
            </PaquetesContext.Provider>
        </View>
    )
}

export const usePaquetes = () => {
    return useContext(PaquetesContext)!;
}