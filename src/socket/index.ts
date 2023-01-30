// import { Server as SocketServer } from "socket.io";
// import httpServer from "../index";

// const io = new SocketServer(httpServer, {
//     cors:{
//         origin:"http://127.0.0.1:5173"
//     }
// });


// io.on("connection", (socket) => {
//     console.log("A user connected");
//     console.log(socket.id)
//     socket.on('message', (message) => {
//         console.log(message);
//     });
// });