import React, { createContext, useState } from 'react';

// Crear el contexto
export const AppContext = createContext();

// Crear el proveedor del contexto
export const AppProvider = ({ children }) => {
    // Estado para usuarios
    const [user, setUser] = useState([{ id: 1, userName: "usuario", userPass: "1234" }]);
    // Estado para tareas
    const [tasks, setTasks] = useState([{ id: 1, title: "Tarea1", content: "Hola MUndo!", author: "usuario", date: new Date() }])
    // Estado para el estado de inicio de sesión
    const [loged, setLoged] = useState({ user: null, status: false })
    // Estado para el tema oscuro
    const [darkTheme, setDarkTheme] = useState(false)

    // Función para cambiar entre temas claro y oscuro
    const handleTheme = () => {
        setDarkTheme(!darkTheme)
    }

    // Función para agregar usuarios
    const handleUser = (newValue) => {
        setUser([...user, newValue])
    }

    // Función para agregar tareas
    const addTasks = (newTask) => {
        setTasks([...tasks, newTask])
        return true
    }

    // Función para buscar un usuario
    const findUser = (userName, userPass) => {
        if (user?.some(account => account.userName === userName && account.userPass === userPass)) {
            if (loged.status == false) {
                setLoged({ user: userName, status: true })
            }
            return true
        } else {
            return false
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setLoged({ user: null, status: false })
    }

    // Función para encontrar una tarea por su ID
    const findTask = (id) => {
        const index = tasks?.findIndex(task => task.id == id);
        if (index !== -1) {
            return { tarea: tasks[index], indice: index };
        }
    };

    // Función para editar una tarea
    const editTask = (index, newContent) => {
        try {
            tasks[index].title = newContent.title
            tasks[index].content = newContent.content
            return true
        } catch (error) {
            console.log("Error detectado: ", error);
            return false
        }
    }

    // Función para eliminar una tarea
    const deleteTask = (id) => {
        try {
            tasks.splice(id, 1)
        } catch (error) {
            console.log("Error detectado: ", error);
        }
    }

    return (
        // Proveedor del contexto que envuelve a los componentes hijos
        <AppContext.Provider value={{ user, handleUser, findUser, loged, logout, tasks, addTasks, findTask, deleteTask, editTask, darkTheme, handleTheme }}>
            {children}
        </AppContext.Provider>
    );
};
