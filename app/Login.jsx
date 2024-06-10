import React, { useContext } from "react";
import { View, TextInput, Text, ImageBackground, Image, TouchableOpacity, Alert } from "react-native";
import { AppContext } from "../context/AppContext";
import PasswordInput from "../components/PasswordInput";
import StyledButton from "../components/ButtonStyled";
import googleBgImg from "../assets/images/bg.jpg";
import googleLogo from "../assets/images/tasks.png";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const { findUser } = useContext(AppContext);
    const [userName, setUserName] = React.useState("");
    const [userPass, setUserPass] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleUserName = (text) => {
        setUserName(text);
    };

    const handleUserPass = (text) => {
        setUserPass(text);
    };

    const showAlert = () => {
        Alert.alert(
            "Success",
            `¡Loggin Correcto, bienvenido ${userName}!`
        );
        router.push("Auth");
    };

    const handleSubmit = () => {
        if (userName !== "" && userPass !== "") {
            if (findUser(userName, userPass)) {
                showAlert();
            } else {
                setMessage("Error: El usuario o contraseña son incorrectas");
            }
        } else {
            setMessage("Error: Completa todos los campos");
        }
    };

    return (
        // Contenedor principal que ocupa toda la pantalla y centra su contenido verticalmente
        <View className="flex flex-1 justify-center items-center bg-white">
            {/* Imagen de fondo */}
            <ImageBackground source={googleBgImg} resizeMode="cover" className="w-full h-full opacity-60 absolute top-0 left-0">
                {/* Contenedor interno que contiene el formulario */}
                <View className="flex flex-col items-center justify-center h-full p-8">
                    <View className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white bg-opacity-80 p-8">
                        {/* Logo */}
                        <Image source={googleLogo} className="w-32 h-32 mb-6" />
                        {/* Título */}
                        <Text className="text-2xl font-bold text-center mb-4">Login</Text>
                        {/* Input para el nombre de usuario */}
                        <View className="w-4/5 mb-4">
                            <TextInput placeholder="Nombre de usuario" style={{ borderWidth: 2, borderColor: "#ccc", borderRadius: 5, paddingLeft: 10, backgroundColor: "#f5f5f5", height: 40, width: 245 }} value={userName} onChangeText={handleUserName} />
                        </View>
                        {/* Input para la contraseña */}
                        <View className="w-4/5 mb-6">
                            <PasswordInput placeholder="Contraseña" value={userPass} setValue={handleUserPass} />
                        </View>
                        {/* Botón de inicio de sesión */}
                        <TouchableOpacity onPress={handleSubmit} style={{ width: 245, paddingVertical: 10, marginBottom: 20, backgroundColor: "#4285F4", borderRadius: 5 }}>
                            <Text style={{ color: "#FFF", textAlign: "center", fontSize: 16 }}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        {/* Enlace para crear una cuenta */}
                        <TouchableOpacity onPress={() => router.push("/")} className="mb-2">
                            <Text className="text-gray-600">¿Aún no tienes una cuenta?</Text>
                        </TouchableOpacity>
                        {/* Mensaje de error o éxito */}
                        <Text style={{ color: message.includes("Error") ? "red" : "green", textAlign: "center", paddingHorizontal: 10, paddingTop: 10 }}>{message}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}