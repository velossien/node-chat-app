const path = require("path");
const http = require("http"); //built in node module
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public"); //this is a better way of doing paths when you need ot go up and out of folders
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);  //this is already used in the background with express --. so can just use the express app as the argument
let io = socketIO(server);  //"server" is the sever we want to use with our websockets. "io" is the websocket server

app.use(express.static(publicPath));

io.on("connection", (socket) => { //.on registers an event listener. "connection" in this case --> lets you do something (in the callback function) when a user connects
    //"socket" is the indiv connected, not all the users
    console.log("New user connected.");

    //emits an event to only socket (indiv user)
    socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app!"));

    //emits an event to all users except socket
    socket.broadcast.emit("newMessage", generateMessage("Admin","New user joined!"));

socket.on("createMessage", (message,callback) => {
    console.log("Message received from client", message);

    //io.emit emits an event to all connections
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from the server."); //calls the callback function from createMessage (in index.js) - this is the server awknowledging that it received the data

});

socket.on("disconnect", () => {
    console.log("User disconnected.");
});
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});