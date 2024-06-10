import React, { useContext } from "react";
import { View, TextInput, Text, ImageBackground, Image, TouchableOpacity, Alert } from "react-native";
import { AppContext } from "../context/AppContext";
import PasswordInput from "../components/PasswordInput";
import StyledButton from "../components/ButtonStyled";
import googleBgImg from "../assets/images/bg.jpg";
import googleLogo from "../assets/images/tasks.png";
import { useRouter } from "expo-router";

export default function Index() {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/;
  const router = useRouter();
  const { handleUser, user } = useContext(AppContext);
  const [userName, setUserName] = React.useState("");
  const [userPass, setUserPass] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleUserName = (text) => {
    setUserName(text);
  };

  const handleUserPass = (text) => {
    setUserPass(text);
  };

  const handlePass2 = (text) => {
    setPass2(text);
  };

  const showAlert = () => {
    Alert.alert("Success", `¡Cuenta creada correctamente!`);
    router.push("Login"); // Redirigir a la pantalla de inicio de sesión después del registro
  };

  const handleSubmit = () => {
    if (
      userPass.length >= 5 &&
      pass2 !== "" &&
      userName.length >= 5 &&
      userName.length <= 10 &&
      regex.test(userPass)
    ) {
      if (userPass === pass2) {
        handleUser({ id: user.length + 1, userName: userName, userPass: userPass });
        showAlert();
      } else {
        setMessage("Error: Las contraseñas no coinciden");
      }
    } else {
      if (userName.length < 5 || userName.length > 10) {
        setMessage("Error: El nombre de usuario debe tener entre 5 y 10 caracteres");
      } else if (!regex.test(userPass) || userPass.length < 5) {
        setMessage("Error: la contraseña debe tener más de 5 caracteres y contener al menos una mayúscula, un número y un carácter especial.");
      }
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
            <Text className="text-2xl font-bold text-center mb-4">Registrarse</Text>
            {/* Input para el nombre de usuario */}
            <View className="w-4/5 mb-4">
              <TextInput placeholder="Nombre de usuario" style={{ borderWidth: 2, borderColor: "#ccc", borderRadius: 5, paddingLeft: 10, backgroundColor: "#f5f5f5", height: 40, width: 245 }} value={userName} onChangeText={handleUserName} />
            </View>
            {/* Input para la contraseña */}
            <View className="w-4/5 mb-4">
              <TextInput placeholder="Contraseña" secureTextEntry={true} style={{ borderWidth: 2, borderColor: "#ccc", borderRadius: 5, paddingLeft: 10, backgroundColor: "#f5f5f5", height: 40, width: 245 }} value={userPass} onChangeText={handleUserPass} />
            </View>
            {/* Input para confirmar contraseña */}
            <View className="w-4/5 mb-6">
              <TextInput placeholder="Confirma tu contraseña" secureTextEntry={true} style={{ borderWidth: 2, borderColor: "#ccc", borderRadius: 5, paddingLeft: 10, backgroundColor: "#f5f5f5", height: 40, width: 245 }} value={pass2} onChangeText={handlePass2} />
            </View>
            {/* Botón de registro */}
            <View className="items-center pt-2">
              <View style={{ backgroundColor: "#1a73e8", width: 245, borderRadius: 5, marginBottom: 20 }}>
                <StyledButton mainColor="#1a73e8" secondColor="#0f60d1" text="REGISTRARSE" onPress={handleSubmit} />
              </View>
              {/* Mensaje de error o éxito */}
              <Text style={{ color: message.includes("Error") ? "red" : "green", textAlign: "center", paddingHorizontal: 10 }}>{message}</Text>
            </View>

            {/* Enlace para iniciar sesión */}
            <TouchableOpacity onPress={() => router.push("/Login")} className="mt-4">
              <Text className="text-blue-600">¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
