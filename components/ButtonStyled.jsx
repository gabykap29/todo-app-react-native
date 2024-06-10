import React from 'react';
import { Text, Pressable } from 'react-native';

export default function StyledButton({ text, onPress, icon, mainColor, secondColor }) {
    return (
        <Pressable
            className={({ pressed }) =>
                pressed ? 'bg-orange-600 transition-all duration-500' : 'bg-orange-400 transition-all duration-500'
            }
            onPress={onPress}
        >
            {({ pressed }) => (
                <Text className={`text-white text-center font-semibold p-1 rounded-md transition-all duration-300 shadow-xl ${pressed ? secondColor : mainColor}`}>
                    {icon}{text}
                </Text>
            )}
        </Pressable>
    );
}
