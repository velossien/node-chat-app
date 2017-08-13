
let socket = io(); //"socket" is the websocket that is created by io();

socket.on("connect", function () { //upon connecting to the server, callback below is called
    console.log("Connected to server.");

});

socket.on("disconnect", function () { //calls callback function below when event occurs
    console.log("Disconnected from server.");
});

// sends message sent to an ordered list on the webpage
socket.on("newMessage", function (message) {
    console.log("New Message!", message);
    let li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    jQuery("#messages").append(li); //add it as the last child
});

/* Leftover code showing how a acknowledgement callback works
socket.emit("createMessage", {
    from: "frank",
    text: "hi"
}, function (data) { //this is an acknowledgement callback - the message below is sent to the client when the server sends back an awknowledgement letting the client know it received the data
    console.log("Client received message!", data);
});
*/

//will submit message when button clicked
jQuery("#message-form").on("submit", function (event) {
    event.preventDefault();  //makes chrome stop reloading everytime a button is clicked (its default state)

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function () {
    });

});