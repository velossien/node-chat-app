 //es6 way of creating a new class
class Users {
    constructor() { //automatically called with arguments sent in like below, (constructors are optional for classes)
        this.users = [];
    } //no comma needed
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {

        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }
        return user;
    }
    getUser(id) {
        let userLookingFor = this.users.filter((user) => {
            return user.id === id;
        });

        return userLookingFor[0];
    }
    getUserList(room) {
        let roomUsers = this.users.filter((user) => {  // .filter goes through the users array and calls function for each user in the array, then puts it in an array
            return user.room === room;
        });

        let namesArray = roomUsers.map((user) => user.name); // goes through the roomUsers array and maps the name of each user to a new array
        return namesArray;
    }
}

module.exports = { Users };
