// AGENDA : OBJECT ORIENTED JS | OOJS


// name: "Sam",
//   age: 35,
//     description: function () {

//     }
// }

// let person = createPerson("Sam", 35)



// function createPerson(name, age) {
//   return {
//     name: name,
//     age: age,
//     description: function () {
//       console.log(`My name is actually Batman, I mean ${this.name}`);
//     }
//   }
// }

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }


// Person.prototype.description = function () {
//   console.log(`My name is actually Batman, I mean ${this.name}`);
// }


class Person {
  static all = []

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  description() {
    console.log(`My name is actually Batman, I mean ${this.name}`);
  }

  static create(name, age) {
    let person = new this(name, age)
    this.all.push(person);
    console.log('this is: ', this.all);
  }
}

Person.create("Sam", 32);
Person.all // []

// class Person
//   attr_accessor :name, :age

//   def initialize(name, age)
//     self.name = name
//     self.age = age
//   end
// end


// let person = new Person("Sam", 32)

// person.description();

