import Express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { Server } from "socket.io"
import { createServer } from "http"
import { connectionHandler } from "./socket/index.js";

const expressServer = Express()
const port = process.env.PORT || 3001


const httpServer = createServer(expressServer)
const socketServer = new Server(httpServer)

socketServer.on("connection", connectionHandler)


mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected!")
    httpServer.listen(port, () => {
        console.log("Server running in port: " + port)
        console.table(listEndpoints(expressServer))
    })
})


