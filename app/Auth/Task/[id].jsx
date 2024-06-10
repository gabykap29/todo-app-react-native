import { Alert, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import { useRouter, useLocalSearchParams } from "expo-router";
import { Drawer } from 'expo-router/drawer';


export default function Login() {
    // Obtener el router para la navegación
    const router = useRouter()
    // Obtener el ID de la tarea de los parámetros de la URL local
    const { id } = useLocalSearchParams();
    // Obtener la tarea y su índice del contexto de la aplicación
    const { findTask, deleteTask, darkTheme } = useContext(AppContext)
    const [task, setTask] = useState(null)

    const { tarea, indice } = findTask(id)

    console.log("index ", tarea, indice);

    // Establecer la tarea cuando se actualice el ID o la tarea
    useEffect(() => {
        if (id && tarea) {
            setTask(tarea)
        }
    }, [id, tarea])

    // Manejar la eliminación de la tarea
    const handleDelete = () => {
        deleteTask(indice)
        router.push("Auth")
    }

    // Mostrar una alerta de confirmación antes de eliminar la tarea
    const showAlert = () => {
        Alert.alert(
            "Alerta",
            "¿Está seguro de que desea eliminar esta tarea?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Aceptar",
                    onPress: () => handleDelete()
                }
            ]
        );
    };

    return (
        <>
            <Drawer.Screen options={{
                drawerLabel: "Tareas",
                title: "Tarea N° " + id
            }} />
            <View style={{ flex: 1, alignItems: 'center', paddingTop: '35%', backgroundColor: darkTheme ? '#4267B2' : '#E9EBEE' }}>

                <View style={{ paddingVertical: 12, width: '85%', borderRadius: 10, borderWidth: 2, borderColor: darkTheme ? '#fff' : '#ccc', backgroundColor: darkTheme ? '#1E2A3A' : '#fff' }}>

                    <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 20, textAlign: 'center', fontWeight: 'bold', paddingBottom: 10 }}>{task?.title}</Text>

                    <View style={{ borderWidth: 2, borderColor: '#ccc', borderRadius: 10, margin: 10 }}>
                        <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 16, textAlign: 'center', fontWeight: 'bold', padding: 10 }}>{task?.content}</Text>
                    </View>

                    <View>
                        <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 16, textAlign: 'center', fontWeight: 'bold', padding: 10 }}>Fecha de creación: {JSON.stringify(task?.date)?.slice(1,-1)}</Text>
                        <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 16, textAlign: 'center', fontWeight: 'bold', padding: 10 }}>Autor: {task?.author}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingHorizontal: 10 }}>
                        {/* Botón para editar la tarea */}
                        <TouchableOpacity style={{ backgroundColor: '#4267B2', borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10 }} onPress={() => router.push(`Auth/Edit/${task.id}`)}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Editar</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        {/* Botón para eliminar la tarea */}
                        <TouchableOpacity style={{ backgroundColor: '#FF0000', borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10 }} onPress={showAlert}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </>
    );
}
