import { Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useInput } from "../../hooks/useForm";
import { AppContext } from "../../context/AppContext";
import { router } from "expo-router";


export default function Login() {
    // Iconos para los botones

    // Contexto de la aplicación
    const { tasks, addTasks, darkTheme, loged } = useContext(AppContext);

    // Hooks para manejar los inputs
    const { input: title, setInput: setTitle } = useInput("");
    const { input: content, setInput: setContent } = useInput("");
    const { input: message, setInput: setMessage } = useInput("");

    // Función para manejar el cambio en el título
    const handleTitle = (text) => {
        setTitle(text);
    };

    // Función para manejar el cambio en el contenido
    const handleContent = (text) => {
        setContent(text);
    };

    // Función para mostrar una alerta de éxito
    const showAlert = () => {
        Alert.alert(
            "Success",
            "Tarea añadida con éxito",
            [
                {
                    text: "Aceptar",
                    onPress: () => console.log("OK Pressed")
                }
            ]
        );
    };

    // Función para manejar el envío del formulario
    const handleSubmit = () => {
        if (title.length > 0 && content.length > 0) {
            const taskId = tasks.length + 1;
            const success = addTasks({ id: taskId, title, content, date: new Date(), author: loged?.user });

            if (success) {
                showAlert();
                router.push("Auth")
                handleTitle("")
                handleContent("")
                setMessage("")
            } else {
                setMessage("Error: Fallo al agregar tarea");
            }
        } else {
            setMessage("Error: Completa todos los campos");
        }
    };

    // Función para manejar la cancelación del formulario
    const handleCancel = () => {
        handleTitle("")
        handleContent("")
        setMessage("")
        router.push("Auth")
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: darkTheme ? "#424242" : "#fff" }}>
            <View style={{ paddingVertical: 8, width: '75%', borderRadius: 8, borderWidth: 2, borderColor: darkTheme ? "#fff" : "#bdbdbd", backgroundColor: darkTheme ? "#303030" : "#fff" }}>
                <Text style={{ color: darkTheme ? "#fff" : "#000", fontSize: 20, textAlign: 'center', fontWeight: 'bold', paddingBottom: 8 }}>Crear tarea</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                    <Text style={{ color: darkTheme ? "#fff" : "#000", fontWeight: 'bold' }}>Título:</Text>
                    <TextInput
                        placeholder="Título"
                        style={{ borderWidth: 2, borderColor: darkTheme ? "#fff" : "#bdbdbd", borderRadius: 8, width: '80%', paddingLeft: 8, backgroundColor: darkTheme ? "#424242" : "#f5f5f5", marginTop: 8 }}
                        value={title}
                        onChangeText={handleTitle}
                    />
                    <Text style={{ color: darkTheme ? "#fff" : "#000", fontWeight: 'bold', marginTop: 16 }}>Descripción:</Text>
                    <TextInput
                        placeholder="Descripción"
                        style={{ borderWidth: 2, borderColor: darkTheme ? "#fff" : "#bdbdbd", borderRadius: 8, width: '80%', paddingLeft: 8, height: 100, backgroundColor: darkTheme ? "#424242" : "#f5f5f5", marginTop: 8 }}
                        value={content}
                        onChangeText={handleContent}
                        multiline
                    />
                </View>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
                    {/* Botón para agregar tarea */}
                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#1e88e5", paddingHorizontal: 16, marginHorizontal:30,paddingVertical: 8, borderRadius: 8 }}>
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 16 }}>Agregar</Text>
                    </TouchableOpacity>
                    {/* Botón para cancelar */}
                    <TouchableOpacity onPress={handleCancel} style={{ backgroundColor: "#e53935", marginHorizontal: 30,paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
