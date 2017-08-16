const path = require("path");
const http = require("http"); //built in node module
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");
const publicPath = path.join(__dirname, "../public"); //this is a better way of doing paths when you need ot go up and out of folders
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);  //this is already used in the background with express --. so can just use the express app as the argument
let io = socketIO(server);  //"server" is the sever we want to use with our websockets. "io" is the websocket server
let users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => { //.on registers an event listener. "connection" in this case --> lets you do something (in the callback function) when a user connects
    //"socket" is the indiv connected, not all the users
    console.log("New user connected.");

    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are required."); //sends back error if name and room are not valid
        }

        socket.join(params.room); //joins a room with the name given by params.room (.join is part of socket.io)
        users.removeUser(socket.id); //removes user from any other rooms
        users.addUser(socket.id, params.name, params.room); //adds user to room

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));  //sends updated userList to everyone in the room.  (NOTE: updateUserList was defined in chat.js)

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!")); //send welcome message only to socket

        socket.broadcast.to(params.room).emit("newMessage", generateMessage("admin", `${params.name} has joined!`)); //sends "user"joined" message to everyone in the room except socket
        callback();
    });

    socket.on("createMessage", (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            //io.emit emits an event to all connections
            io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
        }


        callback(); //calls the callback function from createMessage (in index.js) - this is the server awknowledging that it received the data

    });

    socket.on("createLocationMessage", (coords) => {
        let user = users.getUser(socket.id);
        io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude))
    });

    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id); //will return the user removed

        if (user) { //if user is actually removed, thennn...
            io.to(user.room).emit("updateUserList", users.getUserList(user.room)); //emits and event called "updateUserList" to all users in the room that the user is in (user.room).  This gets a new user list by using the function defined in users.js "getUserList". In chat.js when this event occurs, the new users list is appended to a ordered list and sent to a section of the webpage
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`)); //emits an event called "newMessage".  A function called generateMessage is called which is defined in message.js. This returns a message object.  In chat.js, when this event occurs this message is used to create a new message.
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

/* left here as examples:

//emits an event only to socket (indiv user)
socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));

//emits an event to all users except socket
socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined!"));

//socket leaves room
socket.leave("The Office Fans"); 

//emits and event to all users in the room
io.to("The Office Fans").emit

//emits an event to all users except socket in the room
socket.broadcast.to("The Office Fans").emit
*/