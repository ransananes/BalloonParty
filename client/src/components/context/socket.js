import io from "socket.io-client";
import React from 'react';

export const SOCKET_URL = "http://176.229.237.22:5000";
export const socket = io(SOCKET_URL, { secure: true });
export const SocketContext = React.createContext(socket);
