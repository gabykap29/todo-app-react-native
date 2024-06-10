import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { useToggle } from '../hooks/useToggle';

export default function PasswordInput({ placeholder, value, setValue }) {

    const { toggle: togglePass, handleToggle: handleTogglePass } = useToggle();

    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <TextInput
                placeholder={placeholder}
                style={{
                    borderWidth: 2,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    width: 245,
                    paddingLeft: 10,
                    backgroundColor: "#f5f5f5",
                    margin: 5
                }}
                secureTextEntry={togglePass}
                onChangeText={setValue}
                value={value}
            />

            
        </View>
    );
}
