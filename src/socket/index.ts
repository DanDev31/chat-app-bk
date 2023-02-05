import { Server as SocketServer } from "socket.io";
import http from "http";

    
const initializeSocket = (serverInstance:http.Server<typeof http.IncomingMessage>) => {
        
        const io = new SocketServer(serverInstance, {
            cors:{
                origin:"http://127.0.0.1:5173"
            }
        });

        io.on("connection", (socket) => {
            socket.on('message', (message) => {
                console.log(message, socket.id);
                socket.to('qw-ad_bMpD2IYxJOAAAH').emit('serverMessage', {...message, server:true});
            });
        });

    }

export default initializeSocket;