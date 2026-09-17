import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../Models/NavigationTypes';
import { usePaquetes } from '../../Providers/PaquetesProviders';

type Props = NativeStackScreenProps<RootStackParamList, 'ReservarHotel'>;

const HOTELES_POR_DESTINO = {
    cancun: ['Hotel Caribe Cancún', 'Resort Playa Turquesa'],
    paris: ['Hotel Lumière Paris', 'Le Jardin Boutique Hotel'],
    tokio: ['Tokyo Sakura Hotel', 'Akihabara Central Hotel'],
};

const TIPOS_HABITACION = ['Habitación estándar', 'Habitación doble', 'Suite familiar'];
const DIAS_DISPONIBLES = Array.from({ length: 14 }, (_, index) => index + 1);

function obtenerHoteles(nombrePaquete: string) {
    const nombre = nombrePaquete.toLowerCase();

    if (nombre.includes('cancún')) return HOTELES_POR_DESTINO.cancun;
    if (nombre.includes('parís')) return HOTELES_POR_DESTINO.paris;
    return HOTELES_POR_DESTINO.tokio;
}

function calcularFechaSalida(fechaEntrada: string, dias: number) {
    const partes = fechaEntrada.split('/').map(Number);
    if (partes.length !== 3 || partes.some(Number.isNaN)) return '';

    const [dia, mes, anio] = partes;
    const fecha = new Date(anio, mes - 1, dia);
    if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes - 1 || fecha.getDate() !== dia) return '';

    fecha.setDate(fecha.getDate() + dias);
    return `${String(fecha.getDate()).padStart(2, '0')}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${fecha.getFullYear()}`;
}

export default function ReservarHotel({ navigation }: Props) {
    const { paqueteSeleccionado } = usePaquetes();
    const [hotel, setHotel] = useState('');
    const [habitacion, setHabitacion] = useState('');
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [diasEstadia, setDiasEstadia] = useState<number | null>(null);

    const hotelesDisponibles = paqueteSeleccionado
        ? obtenerHoteles(paqueteSeleccionado.nombre)
        : [];
    const fechaSalida = diasEstadia ? calcularFechaSalida(fechaEntrada, diasEstadia) : '';

    const confirmarReserva = () => {
        if (!hotel || !habitacion || !fechaEntrada.trim() || !diasEstadia) {
            Alert.alert('Completa los datos', 'Selecciona el hotel, la habitación y los días de estadía, e indica la fecha de entrada.');
            return;
        }

        navigation.navigate('ContratarTransporte');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>‹ Volver</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Reservar hotel</Text>
                <Text style={styles.subtitle}>Elige el hospedaje para tu estadía</Text>

                {paqueteSeleccionado && (
                    <View style={styles.summary}>
                        <Text style={styles.summaryLabel}>Paquete seleccionado</Text>
                        <Text style={styles.summaryTitle}>{paqueteSeleccionado.nombre}</Text>
                        <Text style={styles.summaryDetail}>{paqueteSeleccionado.estadia} noches</Text>
                    </View>
                )}

                <Text style={styles.label}>Elige tu hotel</Text>
                <View style={styles.optionsContainer}>
                    {hotelesDisponibles.map((hotelDisponible) => (
                        <TouchableOpacity
                            key={hotelDisponible}
                            style={[styles.option, hotel === hotelDisponible && styles.selectedOption]}
                            onPress={() => setHotel(hotelDisponible)}
                        >
                            <Text style={[styles.optionText, hotel === hotelDisponible && styles.selectedOptionText]}>
                                {hotelDisponible}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Tipo de habitación</Text>
                <View style={styles.optionsContainer}>
                    {TIPOS_HABITACION.map((tipo) => (
                        <TouchableOpacity
                            key={tipo}
                            style={[styles.option, habitacion === tipo && styles.selectedOption]}
                            onPress={() => setHabitacion(tipo)}
                        >
                            <Text style={[styles.optionText, habitacion === tipo && styles.selectedOptionText]}>
                                {tipo}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Fecha de entrada</Text>
                <TextInput
                    value={fechaEntrada}
                    onChangeText={setFechaEntrada}
                    placeholder="Ej. 15/12/2026"
                    placeholderTextColor="#888"
                    style={styles.input}
                />

                <Text style={styles.label}>Cantidad de días (máximo 14)</Text>
                <View style={styles.daysContainer}>
                    {DIAS_DISPONIBLES.map((dias) => (
                        <TouchableOpacity
                            key={dias}
                            style={[styles.dayOption, diasEstadia === dias && styles.selectedDayOption]}
                            onPress={() => setDiasEstadia(dias)}
                        >
                            <Text style={[styles.dayText, diasEstadia === dias && styles.selectedOptionText]}>{dias}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.helperText}>
                    {diasEstadia
                        ? `Salida: ${fechaSalida || 'se calculará con una fecha válida de entrada'}`
                        : 'Selecciona cuántos días deseas hospedarte.'}
                </Text>

                <TouchableOpacity style={styles.primaryButton} onPress={confirmarReserva}>
                    <Text style={styles.buttonText}>Continuar con el transporte</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = {
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { padding: 15, paddingBottom: 30 },
    backText: { color: '#1E5C8A', fontWeight: 'bold' as const, fontSize: 16, marginBottom: 12 },
    title: { fontWeight: 'bold' as const, fontSize: 22, color: '#222' },
    subtitle: { color: '#666', marginTop: 4, marginBottom: 16 },
    summary: { backgroundColor: '#e3f2fd', borderRadius: 6, padding: 14, marginBottom: 18 },
    summaryLabel: { color: '#1565c0', fontWeight: 'bold' as const, fontSize: 13, marginBottom: 5 },
    summaryTitle: { fontWeight: 'bold' as const, fontSize: 17, color: '#222' },
    summaryDetail: { color: '#555', marginTop: 4 },
    label: { color: '#333', fontWeight: 'bold' as const, marginBottom: 6, marginTop: 4 },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, marginBottom: 14, fontSize: 16 },
    optionsContainer: { marginBottom: 14 },
    option: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, marginBottom: 8 },
    selectedOption: { backgroundColor: '#1E5C8A', borderColor: '#1E5C8A' },
    optionText: { color: '#333', fontSize: 15 },
    selectedOptionText: { color: '#fff', fontWeight: 'bold' as const },
    daysContainer: { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8, marginBottom: 6 },
    dayOption: { width: 42, height: 42, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, alignItems: 'center' as const, justifyContent: 'center' as const },
    selectedDayOption: { backgroundColor: '#1E5C8A', borderColor: '#1E5C8A' },
    dayText: { color: '#333', fontWeight: 'bold' as const },
    helperText: { color: '#666', fontSize: 13, marginBottom: 8 },
    primaryButton: { backgroundColor: '#1E5C8A', padding: 13, borderRadius: 6, alignItems: 'center' as const, marginTop: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold' as const, fontSize: 16 },
};