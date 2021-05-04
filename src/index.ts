import express from "express";
import {appUse} from "./main/app";
import {routes} from "./main/routes";
import mongoose from "mongoose";
import {MongoDBUris, PORT} from "./main/config";
import http from "http";
import socketIo from "socket.io";


const app = express();
appUse(app);
routes(app);
const server = http.createServer(app);
const socketServer = socketIo(server);



mongoose.connect(MongoDBUris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("MongoDB connected ");
    const port = process.env.PORT || PORT;
    server.listen(port, () => {
        console.log("Cards-Nya-back 2.0 listening on port: " + port);
    });
}).catch(e => console.log("Nya-MongoDB connection error: ", {...e}));

process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});