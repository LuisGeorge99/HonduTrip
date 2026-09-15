import { useContext, useState } from "react";
import { Transporte } from "../Models/Transporte";
import { ViewReact } from "../Models/ViewReact";
import { View } from "react-native";
import React from "react";
import { TransporteContext } from "../context/TransporteContext";

const MIS_TRANSPORTES: Transporte[] = [
    {
        id: '1',
        nombre: 'Traslado Privado Aeropuerto-Hotel',
        tipo: 'Traslado Privado',
        capacidad: 3,
        moneda: 'HNL',
        precio: 950,
        descripcion: 'Vehículo privado con chofer, directo desde el aeropuerto hasta tu hotel.',
        imagen: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'
    },
    {
        id: '2',
        nombre: 'Van Compartida Aeropuerto-Hotel',
        tipo: 'Traslado Compartido',
        capacidad: 8,
        moneda: 'HNL',
        precio: 450,
        descripcion: 'Van compartida con otros viajeros, salidas cada hora.',
        imagen: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'
    },

    {
        id: '3',
        nombre: 'Auto Rentado Económico',
        tipo: 'Auto Rentado',
        capacidad: 4,
        moneda: 'HNL',
        precio: 1800,
        descripcion: 'Renta por día, transmisión automática, seguro básico incluido.',
        imagen: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800'
    },
    {
        id: '4',
        nombre: 'Auto Rentado SUV',
        tipo: 'Auto Rentado',
        capacidad: 5,
        moneda: 'HNL',
        precio: 3200,
        descripcion: 'SUV con espacio para maletas, ideal para grupos o familias.',
        imagen: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800'
    },

    {
        id: '5',
        nombre: 'Vuelo Doméstico Directo',
        tipo: 'Vuelo',
        capacidad: 1,
        moneda: 'HNL',
        precio: 5400,
        descripcion: 'Vuelo directo con una aerolínea local, 1 maleta de mano incluida.',
        imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'
    },
];

export default function TransporteProvider({children}: ViewReact){

    const [transportes, setTransportes] = useState<Transporte[]>(MIS_TRANSPORTES);
    const [transporteSeleccionado, setTransporteSeleccionado] = useState<Transporte | null>(null);

    const seleccionarTransporte = (transporte: Transporte) => {
        setTransporteSeleccionado(transporte);
    }

    return(
        <View style={{ flex: 1 }}>
            <TransporteContext.Provider value={{ transportes, transporteSeleccionado, seleccionarTransporte }}>
                {children}
            </TransporteContext.Provider>
        </View>
    )
}

export const useTransporte = () => {
    return useContext(TransporteContext)!;
}