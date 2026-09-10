import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useDestinos } from '../Providers/DestinosProviders'; 

export default function ListaDestinos() {


    const { destinos, seleccionarDestino } = useDestinos();

    return (
        <View>
            <FlatList
                data={destinos}
                renderItem={({ item }) => (
                    // Estructura de cajas y textos idéntica a la del profesor
                    <View style={{ padding: 12, backgroundColor: '#e3f2fd', borderRadius: 6 }}>
                        <Text style={{ fontWeight: 'bold' }}>Destino: {item.nombre} | País: {item.pais}</Text>
                        <Text style={{ color: '#555', marginVertical: 4 }}>{item.descripcion}</Text>
                        
                        {/* Acción para mandar el destino seleccionado al Provider */}
                        <TouchableOpacity 
                            style={{ backgroundColor: '#1e88e5', padding: 6, borderRadius: 4, marginTop: 4, alignItems: 'center' }}
                            onPress={() => {
                                seleccionarDestino(item);
                                Alert.alert("Seleccionado", `Elegiste ${item.nombre}`);
                            }}
                        >
                            <Text style={{ color: 'white' }}>Seleccionar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id}
                // Propiedades de FlatList copiadas de la libreta del profesor
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={() => <Text>No hay destinos registrados</Text>}
                ListHeaderComponent={() => <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Explorar Destinos Disponibles</Text>}
                ListFooterComponent={() => <Text style={{ textAlign: 'center', color: '#888' }}>Fin del listado</Text>}
                ListFooterComponentStyle={{ height: 50, marginTop: 10 }}
                ListHeaderComponentStyle={{ height: 40 }}
            />
        </View>
    )
}
