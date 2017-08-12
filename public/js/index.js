
let socket = io(); //"socket" is the websocket that is created by io();

socket.on("connect", function () { //upon connecting to the server, callback below is called
    console.log("Connected to server.");

});

socket.on("disconnect", function () { //calls callback function below when event occurs
    console.log("Disconnected from server.");
});

socket.on("newMessage", function (message) {
    console.log("New Message!", message);
});

