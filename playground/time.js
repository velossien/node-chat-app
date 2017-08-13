let moment = require("moment");

let date = moment(); //current point in time
date.add(100, "year"); //adds 100 years
console.log(date.format("MMM Do, YYYY HH:MM:SS"));

//CHALLENGE:10:35 am, 6:03pm
let date2 = moment();
console.log(date2.format("MMM Do, YYYY h:mm a"));

let someTimestamp = moment().valueOf();
console.log(someTimestamp);