import { Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useInput } from "../../../hooks/useForm";
import { AppContext } from "../../../context/AppContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Login() {
    // Obtener el router para la navegación
    const router = useRouter();
    // Obtener el ID de la tarea de los parámetros de la URL local
    const { id } = useLocalSearchParams();
    // Obtener las funciones del contexto de la aplicación
    const { editTask, findTask, darkTheme } = useContext(AppContext);
    // Obtener la tarea y su índice utilizando el ID
    const { tarea, indice } = findTask(id);

    // Estado local para el título, contenido y mensaje de error
    const { input: title, setInput: setTitle } = useInput("");
    const { input: content, setInput: setContent } = useInput("");
    const { input: message, setInput: setMessage } = useInput("");

    // Función para manejar cambios en el título
    const handleTitle = (text) => {
        setTitle(text);
    };

    // Función para manejar cambios en el contenido
    const handleContent = (text) => {
        setContent(text);
    };

    // Función para manejar el envío del formulario de edición
    const handleSubmit = () => {
        if (title !== "" || content !== "") {
            editTask(indice, { "title": title, "content": content });
            router.push("Auth");
        } else {
            setMessage("Error: Completa todos los campos");
        }
    };

    // Función para mostrar una alerta de confirmación antes de guardar
    const showAlert = () => {
        Alert.alert(
            "Alerta",
            "¿Seguro que desea editar la tarea?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Aceptar",
                    onPress: () => handleSubmit()
                }
            ]
        );
    };

    // Establecer el título y el contenido cuando la tarea se carga inicialmente
    useEffect(() => {
        if (tarea) {
            handleTitle(tarea?.title);
            handleContent(tarea?.content);
        }
    }, [tarea, id]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: darkTheme ? '#4267B2' : '#E9EBEE' }}>

            <View style={{ width: '75%', borderRadius: 10, borderWidth: 2, borderColor: darkTheme ? '#fff' : '#ccc', backgroundColor: darkTheme ? '#1E2A3A' : '#fff', padding: 20 }}>

                <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 24, textAlign: 'center', fontWeight: 'bold', paddingBottom: 20 }}>Editar Tarea</Text>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Nuevo Titulo:</Text>
                    <TextInput placeholder="Titulo de la tarea" style={{ borderColor: darkTheme ? '#fff' : '#ccc', borderWidth: 2, borderRadius: 5, padding: 10, backgroundColor: darkTheme ? '#1E2A3A' : '#fff', color: darkTheme ? '#fff' : '#000' }} value={title} onChangeText={handleTitle} />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Nuevo Contenido:</Text>
                    <TextInput placeholder="Contenido de la tarea" style={{ borderColor: darkTheme ? '#fff' : '#ccc', borderWidth: 2, borderRadius: 5, padding: 10, backgroundColor: darkTheme ? '#1E2A3A' : '#fff', color: darkTheme ? '#fff' : '#000', height: 100 }} multiline={true} numberOfLines={5} value={content} onChangeText={handleContent} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    {/* Botón para guardar la edición */}
                    <TouchableOpacity onPress={showAlert} style={{ backgroundColor: '#4267B2', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Guardar</Text>
                    </TouchableOpacity>
                    <View style={{ width: 20 }} />
                    {/* Botón para cancelar la edición */}
                    <TouchableOpacity onPress={() => router.push("Auth")} style={{ backgroundColor: '#FF0000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

                {/* Mostrar mensaje de error o éxito */}
                <Text style={{ color: message?.includes("Error") ? 'red' : 'green', fontSize: 16, textAlign: 'center' }}>{message}</Text>

            </View>
        </View>
    );
}
