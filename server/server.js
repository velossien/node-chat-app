const path = require("path");
const http = require("http"); //built in node module
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public"); //this is a better way of doing paths when you need ot go up and out of folders
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);  //this is already used in the background with express --. so can just use the express app as the argument
let io = socketIO(server);  //"server" is the sever we want to use with our websockets. "io" is the websocket server

app.use(express.static(publicPath));

io.on("connection", (socket) => { //.on registers an event listener. "connection" in this case --> lets you do something (in the callback function) when a user connects
    //"socket" is the indiv connected, not all the users
    console.log("New user connected.");

    socket.emit("newMessage", {
        to: "tara",
        text: "hiya",
        createdAt: 123
    });

    socket.on("createMessage",(message)=>{
        console.log("Message received from client", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected.");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});