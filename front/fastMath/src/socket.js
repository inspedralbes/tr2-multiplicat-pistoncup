import { io } from "socket.io-client";


// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io("http://localhost:3000");

import { useAppStore } from '@/stores/app.js';
/*
socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
*/


socket.on('arrayUsers', (users) => {
    const appStore = useAppStore();
    // Actualiza la lista de usuarios en la tienda Pinia
    appStore.setUsers(users);

      // Llamar a la acción para actualizar usuarios conectados en Pinia
      appStore.updateConnectedUsers(usersConectados);
});