//es6 way of creating a new class
class Person {
    constructor (name, age) { //automatically called with arguments sent in like below
        this.name = name; //takes the name parameter of the indiv object and sets it to name, (constructors are optional for classes)
        this.age= age;
    } //no comma needed
    getUserDescription(){
        return `${this.name} is ${this.age} year(s).`
    }
}

let me = new Person ("Tara",25);
console.log("this.name", me.name);
let description = me.getUserDescription();
console.log(description);