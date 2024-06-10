import React, { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { router } from 'expo-router';

const Settings = () => {
    // Contexto de la aplicación
    const { darkTheme, handleTheme, logout, loged } = useContext(AppContext);

    return (
        // Vista principal con estilos condicionales según el tema oscuro
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: darkTheme ? '#4267B2' : '#E9EBEE', paddingVertical: 50 }}>
            {/* Botón para cambiar el tema */}
            <TouchableOpacity onPress={handleTheme} style={{ backgroundColor: '#4267B2', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 5, marginBottom: 20 }}>
                {/* Texto del botón con condicional para mostrar el estado actual del tema */}
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cambiar tema: {darkTheme ? "claro" : "oscuro"}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
