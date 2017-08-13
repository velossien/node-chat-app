let expect = require("expect");
let {generateMessage} = require("./message");


describe("generateMessage",()=>{
    it("should generate correct message object",()=>{
        let from= "Tara";
        let text= "Lol this worked.";

        let res = generateMessage(from, text);

        console.log(res);

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA("number");
        
    })
});