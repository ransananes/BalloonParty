import io from "socket.io-client";
import React from 'react';

//export const SOCKET_URL = "https://balloonparty.herokuapp.com/";
export const SOCKET_URL = "http://localhost:5000/";
export const socket = io(SOCKET_URL, { secure: true });
export const SocketContext = React.createContext(socket);
