/**
 * An array in programming is:
 * Aa data structure that allows you to store a collection of elements of the same or different data types under a single variable name.
 * Each element in an array is accessed by its index, which is an integer value representing its position in the array.
 * It's known by a list
 */

// Declaration: Here we declare an array 'numbers' and initialize it with three elements.
let numbers = [-1, 0, 1];

//An array in node.js is from type of object
console.assert(typeof numbers, "object");

console.log("Index 0 => ", numbers[0]); // Output: -1
console.log("Index 1 => ", numbers[1]); // Output: 0
console.log("Index 2 => ", numbers[2]); // Output: 1

// Reference copy: Here we create a reference copy of the 'numbers' array.
// Both 'numbers' and 'numbersCopy' now reference the same array in memory.
let numbersCopy = numbers;

// Modifying the 'numbersCopy' array also modifies the original 'numbers' array.
numbersCopy[0] = 1;
numbersCopy[1] = 2;
numbersCopy[2] = 3;

// Asserting the equality between 'numbers' and 'numbersCopy'.
console.assert(numbers === numbersCopy);

// The list length, total elements in array
listSize = numbersCopy.length;
console.log("Size =>", listSize);

// Get the index of an element
indexof = numbersCopy.length;
console.log("Size =>", listSize);


// Push, add a item element in array (last index), returns the new list length
let newLength = numbers.push(4);
console.assert(numbers, [1, 2, 3, 4]);
console.assert(newLength, 4);

// Unshift, add a item element in array (last index), returns the new list length
newLength = numbers.unshift(0);
console.assert(numbers, [0, 1, 2, 3, 4]);
console.assert(newLength, 5);

// Pop, remove the last item from array, returns the new list length
newLength = numbers.pop();
console.assert(numbers, [0, 1, 2, 3]);
console.assert(newLength, 4);

// Pop, remove the first item from array, returns the new list length
numbers.shift();
console.assert(numbers, [1, 2, 3]);
console.assert(newLength, 3);

/**
 * The splice() method in JavaScript is used to change the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * It allows you to modify the array in a flexible manner, based on specific indices and elements to be added or removed.
 */
numbers = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

//Exemple 1, splice(), remove the only number 11
let removedItems = numbers.splice(1, 1);
console.assert(numbers, [10, 12, 13, 14, 15, 16, 17, 18, 19]);
console.assert(removedItems, [11]);

//Exemple 2, splice(), remove the 2 last numbers
removedItems = numbers.splice(-2);
console.assert(numbers, [10, 12, 13, 14, 15, 16, 17]);
console.assert(removedItems, [18, 19]);

//Exemple 3, splice(), remove the 2 first numbers
removedItems = numbers.splice(2);
console.assert(numbers, [13, 14, 15, 16, 17]);
console.assert(removedItems, [10, 12]);

//Exemple 3, splice(), remove the two elements after an index
removedItems = numbers.splice(1, 2);
console.assert(numbers, [13, 14, 17]);
console.assert(removedItems, [15, 16]);

// Slice is used to create a new array containing a portion of the original array, starting from an index and optionally ending at another index (exclusive).
numbers = [1,2,3,4,5,6]
console.log("\nNumbers before slice =>",numbers)
let sliced = numbers.slice(-2)
console.log("sliced only 2 last numbers =>",sliced)
sliced = numbers.slice(2)
console.log("sliced only 2 first numbers  =>",sliced)
sliced = numbers.slice(1,-2)
console.log("sliced staring in index 1 and finishing in 2nd last index  =>",sliced)

//Creating a list of objecting, in this exemple cars
const cars = [
  {
    brand: "Volkswagen",
    model: "Golf GTI",
    price: 15999.99,
  },
  {
    brand: "Toyota",
    model: "Corolla",
    price: 18999.9,
  },
  {
    brand: "Toyota",
    model: "Prius",
    price: 19999.99,
  },
  {
    brand: "Honda",
    model: "Civic",
    price: 17999.9,
  },
];

//Console as table
console.log("\nTable of all cars:");
console.table(cars);

//The fn forEach() is used to iterate over all elements in the list
let sum = 0;
cars.forEach(car => {
  sum += car.price
});
const average = sum / cars.length;
console.log("\naverage ($) =>",average)

//The fn filter(), creates a new array filled with elements given a condition
console.log("\nUsing filter to find all Toyotas:");
const toyotaCars = cars.filter(car => car.brand === "Toyota");
console.table(toyotaCars);

//The fn find(), Returns the first element in the array that satisfies the provided testing function.
console.log("\nUsing find to find the first Toyota car:");
const toyotaCar = cars.find(car => car.brand === "Toyota");
console.table(toyotaCar);

// The fn map() creates a new array from calling a function for every array elemen
console.log("\nUsing map to create an new array of car models:");
const carModels = cars.map(car => car.model);
console.log(carModels);

// The fn reduce() method returns a single value: the function's accumulated result.
sum = cars.reduce((accumulator, car) => {
    return accumulator + car.price;
}, 0);
console.log("Total price ($) =>",sum)

//The fn sort() sorts the elements of an array by an specif rule
console.log("\nSort by cars prices ascending");
const sortedCarsByPriceAsc = cars.sort((a, b) => a.price - b.price);
console.table(sortedCarsByPriceAsc);

console.log("\nSort by cars prices descending");
const sortedCarsByPriceDesc = cars.sort((a, b) => b.price - a.price);
console.table(sortedCarsByPriceDesc);


// Creating an array of arrays (matrix)
console.log("\nArray of arrays Matrix:")
const arrayOfArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.table(arrayOfArrays)

// Accessing elements in the array of arrays
console.log("Element at row 1, column 2:", arrayOfArrays[0][1]); // Output: 2
console.log("Element at row 2, column 3:", arrayOfArrays[1][2]); // Output: 6
console.log("Element at row 3, column 1:", arrayOfArrays[2][0]); // Output: 7

// Modifying elements in the array of arrays
arrayOfArrays[1][1] = 10;
console.log("Modified element at row 2, column 2:", arrayOfArrays[1][1]); // Output: 10

// Iterating over the array of arrays
console.log("Iterating over the array of arrays:");
for (let row of arrayOfArrays) {
  for (let element of row) {
    console.log(element);
  }
}
