const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://mighty-escarpment-43370.herokuapp.com/",
        'Access-Control-Allow-Origin': "https://mighty-escarpment-43370.herokuapp.com/",
        methods: ["GET", "POST"],
    },
});

let connections = [];

// function displayConnections() {
//     console.log(`connections are ${connections}`);
// }

io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);
    

    socket.on("newUser", id => {
        console.log(`Hi, I'm User ${id}`);
    });

    socket.on('userJoin', (worker) => {        
        // if (connections.length === 0) {
        //     worker.host = true;
        // }

        for (let i = 0; i < connections.length; i++) {
            if (connections[i].id === worker.id){
                socket.leave(`${connections[i].room}`);
                connections.splice(i, 1);
            }
        }

        connections.push(worker);
        console.log(connections);

        socket.join(`${worker.room}`)
        io.to(`${worker.room}`).emit("enteredRoom", (worker.room));
    });
    

    socket.on('disconnect', () => {
        for (let i = 0; i < connections.length; i++) {
            if (connections[i].id === socket.id){
                connections.splice(i, 1);
            }
        }
        console.log('user disconnected ' + socket.id);

        socket.emit('checkRoom', connections);
      });

})










server.listen(process.env.PORT || 3000, () => {
    console.log("SERVER IS RUNNING");
})