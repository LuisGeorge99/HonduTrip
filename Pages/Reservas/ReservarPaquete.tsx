import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';
import { usePaquetes } from '../../Providers/PaquetesProviders';

type Props = NativeStackScreenProps<RootStackParamList, 'ReservarPaquete'>;

export default function ReservarPaquete({ navigation }: Props) {
    const { paqueteSeleccionado } = usePaquetes();
    const [fechaInicio, setFechaInicio] = useState('');
    const [viajeros, setViajeros] = useState('1');

    if (!paqueteSeleccionado) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No hay un paquete seleccionado</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('ExplorarPaquetes')}>
                    <Text style={styles.buttonText}>Explorar paquetes</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const continuarReserva = () => {
        if (!fechaInicio.trim() || !viajeros.trim()) {
            Alert.alert('Completa los datos', 'Indica la fecha de inicio y la cantidad de viajeros.');
            return;
        }

        navigation.navigate('ReservarHotel');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>‹ Volver</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Reservar paquete</Text>
                <Text style={styles.subtitle}>Completa los datos de tu viaje</Text>

                <View style={styles.summary}>
                    <Text style={styles.summaryTitle}>{paqueteSeleccionado.nombre}</Text>
                    <Text style={styles.summaryDetail}>{paqueteSeleccionado.estadia} noches</Text>
                    <Text style={styles.price}>
                        {paqueteSeleccionado.moneda} {paqueteSeleccionado.precio.toLocaleString()}
                    </Text>
                    <Text style={styles.description}>{paqueteSeleccionado.descripcion}</Text>
                </View>

                <Text style={styles.label}>Fecha de inicio</Text>
                <TextInput
                    value={fechaInicio}
                    onChangeText={setFechaInicio}
                    placeholder="Ej. 15/12/2026"
                    placeholderTextColor="#888"
                    style={styles.input}
                />

                <Text style={styles.label}>Cantidad de viajeros</Text>
                <TextInput
                    value={viajeros}
                    onChangeText={setViajeros}
                    placeholder="Ej. 2"
                    placeholderTextColor="#888"
                    keyboardType="number-pad"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.primaryButton} onPress={continuarReserva}>
                    <Text style={styles.buttonText}>Continuar con el hotel</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = {
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { padding: 15, paddingBottom: 30 },
    backText: { color: '#1E5C8A', fontWeight: 'bold' as const, fontSize: 18, marginBottom: 12 },
    title: { fontWeight: 'bold' as const, fontSize: 22, color: '#222' },
    subtitle: { color: '#666', marginTop: 4, marginBottom: 16 },
    summary: { backgroundColor: '#efebe9', borderRadius: 6, padding: 14, marginBottom: 18 },
    summaryTitle: { fontWeight: 'bold' as const, fontSize: 18, color: '#222' },
    summaryDetail: { color: '#555', marginTop: 5 },
    price: { color: '#2e7d32', fontWeight: 'bold' as const, fontSize: 16, marginTop: 8 },
    description: { color: '#555', marginTop: 6, lineHeight: 20 },
    label: { color: '#333', fontWeight: 'bold' as const, marginBottom: 6, marginTop: 4 },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, marginBottom: 14, fontSize: 16 },
    primaryButton: { backgroundColor: '#2e7d32', padding: 13, borderRadius: 6, alignItems: 'center' as const, marginTop: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold' as const, fontSize: 16 },
    emptyContainer: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' as const, justifyContent: 'center' as const, padding: 20 },
    emptyTitle: { color: '#555', fontSize: 18, marginBottom: 16 },
};