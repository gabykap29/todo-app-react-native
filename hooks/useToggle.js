import { useState } from "react";

export function useToggle() {

    const [toggle, setToggle] = useState(true)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return { toggle, handleToggle }
}