import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useTransporte } from '../../Providers/TransporteProviders';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContratarTransportePage() {

    const { transportes, seleccionarTransporte } = useTransporte();
    const navigation = useNavigation<any>();

    const [tagSeleccionado, setTagSeleccionado] = useState('Todos');
    const tagsDisponibles = ['Todos', 'Traslado Privado', 'Traslado Compartido', 'Auto Rentado', 'Vuelo'];

    const filtrados = transportes.filter(t => {
        if (tagSeleccionado === 'Todos') return true;
        return t.tipo === tagSeleccionado;
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

            <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                    Contrata tu Transporte
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 5 }}>
                    {tagsDisponibles.map((tag) => {
                        const esActivo = tagSeleccionado === tag;

                        return (
                            <TouchableOpacity
                                key={tag}
                                style={{
                                    backgroundColor: esActivo ? '#e65100' : '#e0e0e0',
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

                    <View style={{ padding: 12, backgroundColor: '#fff3e0', borderRadius: 6, marginBottom: 5 }}>
                        <Image
                            source={{ uri: item.imagen }}
                            style={{ width: '100%', height: 200, borderRadius: 6, marginBottom: 10 }}
                            resizeMode='cover'
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {item.nombre} — {item.tipo}
                        </Text>

                        <Text style={{ color: '#e65100', fontWeight: 'bold', marginVertical: 2, fontSize: 15 }}>
                            Precio: {item.moneda} {item.precio.toLocaleString()}
                        </Text>

                        <Text style={{ color: '#555', marginVertical: 4 }}>
                            {item.descripcion}
                        </Text>

                        <Text style={{ color: '#1565c0', fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>
                            👥 Capacidad: {item.capacidad} {item.capacidad === 1 ? 'persona' : 'personas'}
                        </Text>

                        <TouchableOpacity
                            style={{ backgroundColor: '#e65100', padding: 8, borderRadius: 4, marginTop: 10, alignItems: 'center' }}
                            onPress={() => {
                                seleccionarTransporte(item);
                                Alert.alert("Transporte Contratado", `${item.nombre} (${item.tipo})`);
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Contratar este transporte</Text>
                        </TouchableOpacity>
                    </View>
                )}

                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListFooterComponentStyle={{ marginBottom: 30 }}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', color: '#777', marginTop: 30 }}>
                        Aun no hay transporte para {tagSeleccionado}
                    </Text>
                )}
            />

        </SafeAreaView>
    )
}