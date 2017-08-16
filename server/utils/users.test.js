const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {

    let exampleUsers;

    beforeEach(() => {
        exampleUsers = new Users();
        exampleUsers.users = [{
            id: "1",
            name: "Mike",
            room: "LOTR"
        },
        {
            id: "2",
            name: "Tara",
            room: "Hobbit"
        },
        {
            id: "3",
            name: "Chris",
            room: "LOTR"
        }];
    });

    it("should add a new user", () => {
        let newUsers = new Users();
        let user = {
            id: "123",
            name: "tara",
            room: "rofl doge room"
        };

        let resUser = newUsers.addUser(user.id, user.name, user.room);

        expect(newUsers.users).toEqual([user]);
    });

    it("should remove a user", () => {
        let user = exampleUsers.removeUser("1");

        expect(user.id).toBe("1");
        expect(exampleUsers.users.length).toBe(2);

    });

    it("should not remove a user", () => {
        let user = exampleUsers.removeUser("1234");

        expect(user).toNotExist();
        expect(exampleUsers.users.length).toBe(3);
    });

    it("should get a user by id", () => {
        let userLookingFor = exampleUsers.getUser("1");
        console.log(userLookingFor);

        expect(userLookingFor).toEqual(exampleUsers.users[0]);
    });

    it("should not find user if id is invalid", () => {
        let wrongIdUser = exampleUsers.getUser("4");

        expect(wrongIdUser).toNotExist();
    });

    it("should return names for LOTR", () => {

        let userList = exampleUsers.getUserList("LOTR");

        expect(userList).toEqual(["Mike", "Chris"]);

    });

    it("should return names for Hobbit", () => {

        let userList = exampleUsers.getUserList("Hobbit");

        expect(userList).toEqual(["Tara"]);

    });
});
