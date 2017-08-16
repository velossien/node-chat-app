
let socket = io(); //"socket" is the websocket that is created by io();

function scrollToBottom() {

    //Selectors
    let messages = jQuery("#messages"); //selects the messages container
    let newMessage = messages.children("li:last-child"); //.children method lets you write a selector specific to the children of "messages"

    //Heights
    let clientHeight = messages.prop("clientHeight"); //.prop gives a cross-browser way of fetching a property
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

socket.on("connect", function () { //upon connecting to the server, callback below is called
    let params = jQuery.deparam(window.location.search); //location is a global option provided by your browser, window.location.search holds the string that came up originally in our url when we put in our name/room on the signing page

    //jQuery has a built-in function that takes an object and makes it into a set of parameters that can be added onto a url.  deparam is a custom-made function that does the opposite of this.

    socket.emit("join", params, function(err){ //emits an event called "join" -- will be emitted by client and heard by server - when server hears this event it will go through the process of setting up the room
        if(err){
            alert(err);
            window.location.href ="/"; //redirects them back the homepage
        } else{
            console.log("no error");
        };
    });
});

socket.on("disconnect", function () { //calls callback function below when event occurs
    console.log("Disconnected from server.");
});

socket.on("updateUserList", function(users){ //defining an event called "updateUserList"
    let ol = jQuery("<ol></ol>");

    users.forEach(function(user){
        ol.append(jQuery("<li></li>").text(user)); //loops through users and adds users one at a time in li tags to an ordered list
    });

    jQuery("#users").html(ol); //adds list to the part of the html with a class called users
});

// sends message sent to an ordered list on the webpage
socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
    /*--How it would be done without mustache:

    let formattedTime= moment(message.createdAt).format("h:mm a");
    console.log("New Message!", message);
    let li = jQuery("<li></li>");
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery("#messages").append(li); //add it as the last child
    */
});

socket.on("newLocationMessage", function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm a");
    let template = jQuery("#location-message-template").html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery("#messages").append(html);
    scrollToBottom();

    /*--How it would be done without mustache:

    let li = jQuery("<li></li>");
    let a = jQuery("<a target='_blank'>My current location</a>");

    li.text(`${message.from} ${formattedTime}: `);
    a.attr("href", message.url);

    li.append(a);
    jQuery("#messages").append(li); 
    */
});

let messageTextbox = jQuery("[name=message]");

// submits message when button clicked
jQuery("#message-form").on("submit", function (event) {
    event.preventDefault();  //makes chrome stop reloading everytime a button is clicked (its default state)

    socket.emit("createMessage", {
        from: "User",
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val(""); //clear message box
    });
});

//finds location when location button clicked using geolocation api
let locationButton = jQuery("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    locationButton.attr("disabled", "disabled").text("Sending location..."); //disables location button and changes text in it

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr("disabled").text("Send location"); //removes disabled attribute from button, renabling it
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location.");

    });
});

/* Leftover code showing how an acknowledgement callback works
socket.emit("createMessage", {
    from: "frank",
    text: "hi"
}, function (data) { //this is an acknowledgement callback - the message below is sent to the client when the server sends back an awknowledgement letting the client know it received the data
    console.log("Client received message!", data);
});
*/