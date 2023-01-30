"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/auth/routes"));
const routes_2 = __importDefault(require("./routes"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const mongodb_1 = require("./db/mongodb");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const port = config_1.default.server.port || 3001;
// Creating server for socket io
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5173"
    }
});
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on('message', (message) => {
        console.log({ user: socket.id, message });
    });
});
(0, mongodb_1.mongoDB)();
app.use("/auth", routes_1.default);
// app.use("/api", verifyToken, routes);
app.use("/api", routes_2.default);
httpServer.listen(port, () => {
    console.log("Listening in the port " + port);
});
exports.default = httpServer;
