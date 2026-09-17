import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { usePaquetes } from '../../Providers/PaquetesProviders';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExplorarPaquetesPage() {

    const { paquetes, seleccionarPaquete } = usePaquetes();
    const navigation = useNavigation<any>();
    
    const [tagSeleccionado, setTagSeleccionado] = useState('Todos');
    const tagsDisponibles = ['Todos', 'Cancún', 'París', 'Tokio', 'Temporada'];

    const filtrados = paquetes.filter(p => {
        if (tagSeleccionado === 'Todos') return true;
        return p.nombre.toLowerCase().includes(tagSeleccionado.toLowerCase());
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            
            <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                    Explora Combos y Hospedajes
                </Text>
                
                {/* 🟢 NUEVO: Contenedor horizontal para tus botones/tags */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 5 }}>
                    {tagsDisponibles.map((tag) => {
                        const esActivo = tagSeleccionado === tag;

                        return (
                            <TouchableOpacity
                                key={tag}
                                style={{
                                    backgroundColor: esActivo ? '#2e7d32' : '#e0e0e0',
                                    paddingHorizontal: 14,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                }}
                                onPress={() => setTagSeleccionado(tag)}
                            >
                                <Text style={{ 
                                    color: esActivo ? '#fff' : '#333', 
                                    fontWeight: 'bold',
                                    fontSize: 14 
                                }}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <FlatList
                data={filtrados}
                contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 30 }}
                renderItem={({ item }) => (

                    <View style={{ padding: 12, backgroundColor: '#efebe9', borderRadius: 6, marginBottom: 5 }}>
                        <Image
                            source={{ uri: item.imagen }}
                            style={{ width: '100%', height: 200, borderRadius: 6, marginBottom: 10 }}
                            resizeMode='cover'
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {item.nombre} — {item.estadia} Noches
                        </Text>

                        <Text style={{ color: '#2e7d32', fontWeight: 'bold', marginVertical: 2, fontSize: 15 }}>
                            Precio: {item.moneda} {item.precio.toLocaleString()}
                        </Text>

                        <Text style={{ color: '#555', marginVertical: 4 }}>
                            {item.descripcion}
                        </Text>

                        <Text style={{ color: '#d84315', fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>
                            🎁 Incluido por estadía: {
                                item.estadia <= 2 ? 'Maleta de mano gratis' :
                                    item.estadia <= 4 ? 'Seguro médico + Traslado al hotel' :
                                        'Tour guiado completo todo incluido'
                            }
                        </Text>

                        <TouchableOpacity
                            style={{ backgroundColor: '#2e7d32', padding: 8, borderRadius: 4, marginTop: 10, alignItems: 'center' }}
                            onPress={() => {

                                seleccionarPaquete(item);
                                navigation.navigate('ReservarPaquete');
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Seleccionar este paquete</Text>
                        </TouchableOpacity>
                    </View>
                )}

                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListFooterComponentStyle={{ marginBottom: 30 }}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', color: '#777', marginTop: 30 }}>
                        Aun no hay paquetes para {tagSeleccionado}
                    </Text>
                )}
            />

        </SafeAreaView>
    )
}
