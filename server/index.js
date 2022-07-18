const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);

    socket.on("newUser", socket => {
        console.log(`Hi, I'm User${socket.id}`);
    })
})








server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})