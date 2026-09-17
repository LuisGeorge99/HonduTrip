import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useDestinos } from '../../Providers/DestinosProviders';
import { useNavigation } from '@react-navigation/native';

export default function ExplorarPage() {
    const { destinos } = useDestinos();
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 15 }}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>Descubre tu próximo destino</Text>
            </View>
            <FlatList
                data={destinos}
                renderItem={({ item }) => (

                    <View style={{ padding: 12, backgroundColor: '#e3f2fd', borderRadius: 6 }}>
                        <Image
                            source={{ uri: item.imagen }}
                            style={{ width: '100%', height: 200, borderRadius: 6, marginBottom: 10 }}
                            resizeMode='cover'
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            📍 {item.nombre} — {item.pais}
                        </Text>
                        <Text style={{ color: '#555', marginVertical: 4 }}>
                            {item.descripcion}
                        </Text>

                        <Text style={{ color: '#1565c0', fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>
                            Temporada ideal: {
                                item.nombre === 'Cancún' ? 'Diciembre a Abril' :
                                    item.nombre === 'París' ? 'Mayo a Septiembre' :
                                        item.nombre === 'Tokio' ? 'Marzo a Mayo' : 'Todo el año'
                            }
                        </Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}

                ListFooterComponent={() => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#28a745',
                            padding: 14,
                            borderRadius: 6,
                            marginTop: 15,
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            navigation.navigate('ExplorarPaquetes');
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                            Buscar Paquetes de Viaje
                        </Text>
                    </TouchableOpacity>
                )}
                ListFooterComponentStyle={{ marginBottom: 30 }} />
        </SafeAreaView>
    )
}
