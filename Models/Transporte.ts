export interface Transporte{
    id: string;
    nombre: string;
    tipo: string;
    capacidad: number;
    moneda: string;
    precio: number;
    descripcion?: string;
    imagen?: string;
}