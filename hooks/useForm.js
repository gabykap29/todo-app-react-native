import { useState } from "react";

export function useInput({ initialValue }) {

    const [input, setInput] = useState(initialValue)

    return { input, setInput }

}