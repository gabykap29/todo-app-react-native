import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function Layout() {
  // Contexto de la aplicación
  const { darkTheme } = useContext(AppContext);

  return (
    // Contenedor de la vista con el gestor de eventos de gestos
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Componente Drawer para la navegación lateral */}
      <Drawer>

        {/* Pantalla principal de la lista de tareas */}
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: "Tareas",
            title: "Tareas",
            // Estilos para el Drawer
            drawerStyle: {
              backgroundColor: darkTheme ? '#1f2937' : "white"  // Color de fondo del Drawer
            },
            // Estilos para el encabezado
            headerStyle: {
              backgroundColor: darkTheme ? '#111827' : "white"
            },
            headerTintColor: darkTheme ? 'white' : "black"  // Color del texto del encabezado
          }}
        />

        {/* Pantalla para agregar una nueva tarea */}
        <Drawer.Screen
          name='AddTask'
          options={{
            title: "Crear",
            drawerStyle: {
              backgroundColor: darkTheme ? '#1f2937' : "white"  // Color de fondo del Drawer
            },
            headerStyle: {
              backgroundColor: darkTheme ? '#111827' : "white"
            },
            headerTintColor: darkTheme ? 'white' : "black"  // Color del texto del encabezado
          }}
        />

        {/* Pantalla de herramientas */}
        <Drawer.Screen
          name='tools'
          options={{
            drawerLabel: "Herramientas",
            title: "Herramientas",
            drawerStyle: {
              backgroundColor: darkTheme ? '#1f2937' : "white"  // Color de fondo del Drawer
            },
            headerStyle: {
              backgroundColor: darkTheme ? '#111827' : "white"
            },
            headerTintColor: darkTheme ? 'white' : "black"  // Color del texto del encabezado
          }}
        />

        {/* Pantalla de una tarea específica */}
        <Drawer.Screen
          name='Task/[id]'
          options={{
            drawerItemStyle: { display: "none" },
            drawerStyle: {
              backgroundColor: darkTheme ? '#1f2937' : "white"  // Color de fondo del Drawer
            },
            headerStyle: {
              backgroundColor: darkTheme ? '#111827' : "white"
            },
            headerTintColor: darkTheme ? 'white' : "black"  // Color del texto del encabezado
          }}
        />

        {/* Pantalla para editar una tarea */}
        <Drawer.Screen
          name='Edit/[id]'
          options={{
            title: "Editar tarea",
            drawerItemStyle: { display: "none" },
            drawerStyle: {
              backgroundColor: darkTheme ? '#1f2937' : "white"  // Color de fondo del Drawer
            },
            headerStyle: {
              backgroundColor: darkTheme ? '#111827' : "white"
            },
            headerTintColor: darkTheme ? 'white' : "black"  // Color del texto del encabezado
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}
