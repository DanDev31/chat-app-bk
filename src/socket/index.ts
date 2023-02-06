import { Server as SocketServer } from "socket.io";
import http from "http";
import moment from "moment";

type SocketUsers = {
    userId:string;
    socketId:string;
}

let users:SocketUsers[] = [];

const addUsers = (userId:string, socketId:string) => {
    if(userId && socketId){
        const user = users.find(user => user.userId === userId);
        if(!user){
            users.push({userId, socketId});
        }
    }
};

const getUser = (contactId:string) => {
    return users.length > 0 && users.find(user => user.userId === contactId);
};
 
const initializeSocket = (serverInstance:http.Server<typeof http.IncomingMessage>) => {

        const io = new SocketServer(serverInstance, {
            cors:{
                origin:"http://127.0.0.1:5173"
            }
        });

        io.on("connection", (socket) => {
            console.log("a user connected");
            
            socket.on('addUser', (userId) => {
                addUsers(userId, socket.id);
                console.log(users)
            });
            
           socket.on('message', ({userId, contactId, message}) => {
                const user = getUser(contactId);
                console.log(message)
                console.log("idcontact", contactId)

                if(user){

                    io.to(user.socketId).emit('message', {
                        id:userId,
                        date:moment().format('hh:mm'),
                        message,
                        isReaded:false
                    })
                };
            });
        });

    }

export default initializeSocket;