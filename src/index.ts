import express from "express";
import cors from "cors";
import auth from "./api/auth/routes";
import routes from "./routes";
import http from "http";
import config from "./config";
import ioSocket from "./socket/index";
import { mongoDB } from "./db/mongodb";
import { verifyToken } from "./middlewares/verifyToken";
import { Server as SocketServer } from "socket.io";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = config.server.port || 3001;

// Creating server for socket io
const httpServer = http.createServer(app);
//Initialize socket server
ioSocket(httpServer);
mongoDB();
app.use("/auth", auth)
// app.use("/api", verifyToken, routes);
app.use("/api", routes);

httpServer.listen(port, () => {
    console.log("Listening in the port " +  port);
})

export default httpServer;