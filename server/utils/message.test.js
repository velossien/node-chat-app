let expect = require("expect");
let {generateMessage, generateLocationMessage} = require("./message");


describe("generateMessage",()=>{
    it("should generate correct message object",()=>{
        let from= "Tara";
        let text= "Lol this worked.";

        let res = generateMessage(from, text);

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA("number");
        
    })
});

describe("generateLocationMessage",()=>{

    it("should generate correct location object",()=>{
        let from="Chris";
        let lat="87";
        let long="98";

        let locationMessage = generateLocationMessage(from, lat, long);

        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe(`https://www.google.com/maps/?q=${lat},${long}`);
        expect(locationMessage.createdAt).toBeA("number");
    });

});