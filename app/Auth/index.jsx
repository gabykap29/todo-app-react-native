import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';


const TaskList = () => {
    // Obtener el tema oscuro del contexto de la aplicación
    const { darkTheme } = useContext(AppContext);
    // Router para la navegación
    const router = useRouter();

    // Componente de lista de tarea individual
    const taskList = ({ item }) => (
        <TouchableOpacity
            onPress={() => router.push(`Auth/Task/${item.id}`)}
            style={{
                backgroundColor: darkTheme ? '#374151' : '#F3F4F6',
                padding: 15,
                marginVertical: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: darkTheme ? 'transparent' : '#E5E7EB',
            }}
        >
            <Text
                style={{
                    color: darkTheme ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}
            >
                {item.title}
            </Text>
            <Text style={{ color: darkTheme ? 'white' : 'black' }}>{item.content}</Text>
        </TouchableOpacity>
    );

    // Obtener la lista de tareas del contexto de la aplicación
    const { tasks } = useContext(AppContext);

    // Efecto para imprimir en consola cuando se actualiza la lista de tareas
    useEffect(() => {
        console.log('Se actualizó', tasks);
    }, [tasks]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: darkTheme ? '#1F2937' : '#FFFFFF' }}>
            {/* Mapear y renderizar cada tarea */}
            {tasks.map((item) => (
                <View key={item.id} style={{ width: '100%' }}>
                    {taskList({ item })}
                </View>
            ))}
            {/* Botón para agregar tarea */}
            <TouchableOpacity
                onPress={() => router.push('Auth/AddTask')}
                style={{
                    backgroundColor: darkTheme ? '#2563EB' : '#3B82F6',
                    padding: 15,
                    marginTop: 10,
                    borderRadius: 10,
                }}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Crear Tarea</Text>
            </TouchableOpacity>
        </View>
    );
}


export default TaskList;