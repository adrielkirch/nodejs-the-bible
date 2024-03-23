/**
 * The Reflect object in JavaScript provides a set of static methods that mirror the functionalities of various internal operations and language constructs.
 * These methods are designed to be consistent with the Object-oriented programming (OOP) paradigm and provide a more uniform interface for performing common meta-programming tasks.
 *
 * Reflect methods are often used in scenarios where direct access to internal operations or language constructs is either limited or unavailable.
 * They offer a safer and more flexible alternative to accessing and manipulating objects, properties, and prototypes.
 *
 * Some common use cases for Reflect methods include:
 * - Property manipulation: Reflect methods allow you to perform property-related operations such as getting, setting, and deleting properties on objects.
 * - Function invocation: You can use Reflect.apply() to invoke functions with a specified context and arguments, similar to the Function.prototype.apply() method.
 * - Object creation: Reflect.construct() enables you to create new instances of constructors with a specified set of arguments.
 * - Prototype manipulation: Reflect methods such as Reflect.getPrototypeOf() and Reflect.setPrototypeOf() provide a standardized way to interact with an object's prototype.
 * - Property enumeration: Reflect.ownKeys() allows you to retrieve an object's own enumerable and non-enumerable property keys, including symbols.
 *
 * Overall, Reflect methods offer a powerful and consistent API for performing meta-programming tasks in JavaScript, promoting cleaner and more maintainable code by adhering to OOP principles.
 */

"use strict";

const assert = require("assert");

/**
 * Ensure semantics and safety in objects.
 */
// #### Apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 3 }, [100]), 113);

/** A problem that may occur (rarely). */
//Function.prototype.apply = () => console.log('Roubando dados...');
//Function.prototype.apply = () => console.log('Stealing data...');

/**
 * Another problem that may occur (common).
 * Putting an exception inside or getting data from this object (this),
 * every time it's changed and passing it to another function.
 */
myObj.add.apply = function () {
  throw new TypeError("Oops...");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Oops...",
});

/**
 * Using reflect:
 * First parameter = function to be called;
 * Second parameter = this (context that will be inside the function);
 * Third parameter = arguments like those passed in apply.
 */
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// #### defineProperty
/** Used more for semantic issues. */

function MyDate() {}

/**
 * Very ugly, everything is Object, but Object adding properties
 * to a function?
 */
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there..." });

// With reflect, it makes more sense now.
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there...");
assert.deepStrictEqual(MyDate.withReflection(), "Hey dude");

// #### defineProperty (FORGET AND STOP USING JS DELETE)
const withDelete = { user: "Yves" };
// Inefficient, avoid as much as possible.
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const deleteWithReflection = { user: "XuxaDaSilva" };
Reflect.deleteProperty(deleteWithReflection, "user");
assert.deepStrictEqual(deleteWithReflection.hasOwnProperty("user"), false);

// #### get
/**
 * It's also a matter of semantics and also data type.
 * We should only get a reference instances.
 */
assert.deepStrictEqual((1)["userName"], undefined);

/** With reflection, an exception is thrown! */
assert.throws(() => Reflect.get(1, "userName"), TypeError);

// #### has
/**
 * We use a string followed by IN to know if that word is
 * a key of an object.
 */

assert.ok({ superman: "Noob man" }.hasOwnProperty("superman"));

assert.ok("superman" in { superman: "Noob man" });

assert.ok(Reflect.has({ batman: "" }, "batman"));

// #### ownKeys
const user = Symbol("user");
const databaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "yvesguilherme",
};

/**
 * With the object methods, we have to make 2 requests,
 * To get the Symbols and the Objects.
 */
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];
// console.log('objectKeys', objectKeys);
assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);

/** With reflection, you only need to use a single method. */
// console.log('Reflect.ownKeys(databaseUser)', Reflect.ownKeys(databaseUser));
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  "id",
  Symbol.for("password"),
  user,
]);
