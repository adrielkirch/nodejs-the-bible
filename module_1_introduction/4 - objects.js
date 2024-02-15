/**
 * Everything in JavaScript is An Object 
 * When you to copy an object in JavaScript assign it to a new variable it will always point to memory insted of create a duplicate
 */
const obj1 = { a: 'a', b: 'b', c:'c' };
const obj2 = obj1
obj2.a = '1'
obj2.b = '2'
obj2.c = '3'

console.assert(obj1.a, obj2.a);
console.assert(obj1.b, obj2.b);
console.assert(obj1.c, obj2.c);

//This will also create a shallow copy of the object
const obj3 = { ...obj2 };
obj3.a = '1'
obj3.b = '2'
obj3.c = '3'

console.assert(obj3.a, obj2.a);
console.assert(obj3.b, obj2.b);
console.assert(obj3.c, obj2.c);

/**
 * In following away you can really create a "deep" copy using JSON.stringify() and JSON.parse()
 */
// Deep copy
const obj4 = JSON.parse(JSON.stringify(obj3));
obj4.a = 'z'; 
obj4.b = 'y'; 
obj4.c = 'x';
console.assert(obj4.a !== obj3.a, 'obj4.a should be different from obj2.a');
console.assert(obj4.b !== obj3.b, 'obj4.b should be different from obj2.b');
console.assert(obj4.c !== obj3.c, 'obj4.c should be different from obj2.c');

/**
 * Everything in JavaScript is An Object 
 * Let's create an Object using avaScript Object Notation (JSON)
 */
const person1 = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// Adding a new property
person1.gender = 'Male';

// Modifying two property
person1.age = person1.age + 1;
person1['city'] = 'New jersey';
console.assert(person1['city'], 'New jersey')
// Deleting a property
delete person1.city;

console.assert(person1['age'], 32);
console.assert(person1.hasOwnProperty('name'), 'Object does not have "name" property');
console.assert(!person1.hasOwnProperty('city'), 'Object still has "city" property');

/**
 * Creating a new Object using Constructor functions
 */
function Person(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
    
}

//Using prototype you can add new methods associated to that object
Person.prototype.birthdate = function() {
    this.age = this.age + 1;
}

// Create a new person object using the constructor function
const person2 = new Person('Maria', 32, 'Orlando');
person2.birthdate();

// Accessing properties using dot notation and square bracket notation
console.log(person2.name);
console.log(person2['age']);
console.assert(person2['age'], 33);

// Get an array of a given object's own enumerable property names using Object.keys() method
const keys = Object.keys(person2);
console.log(keys);

// Get an array of a given object's own enumerable property values using Object.values() method
const values = Object.values(person2);
console.log(values); 

// Get an array of a given object's own enumerable string-keyed property [key, value] pairs using Object.entries() method
const entries = Object.entries(person2);
console.log(entries); 

// Get an array of all properties (enumerable or not) directly defined on a given object using Object.getOwnPropertyNames() method
const allProperties = Object.getOwnPropertyNames(person2);
console.log(allProperties); 
