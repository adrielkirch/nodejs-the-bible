const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const database = require("../../database");
// Import target functions
const CartWithLibrary = require("./uuid_library");
const CartNoLibrary = require("./uuid_no_library");
const CartRmOld = require("./cart_rm_old");
const CartRmNew = require("./cart_rm_new");

const CartGetPriceOld = require("./cart_get_price_old");
const CartGetPriceNew= require("./cart_get_price_new");

//Benchmark for compare the performance between UUID library or UUUID using crypto
// suite
//   .add("Cart#cartIdUUID", function () {
//     new CartWithLibrary();
//   })
//   .add("Cart#cartIdCrypto", function () {
//     new CartNoLibrary();
//   })
//   .on("cycle", function (event) {
//     console.log(String(event.target));
//   })
//   .on("complete", function () {
//     console.log("Fastest implementation:", this.filter("fastest").map("name")); // Log the name of the fastest implementation
//     console.log(
//       "Mean time:",
//       this.filter("fastest").map("stats.mean") + " seconds"
//     ); // Log the average execution time of the fastest implementation
//     console.log(
//       "Sample variance:",
//       this.filter("fastest").map("stats.variance")
//     ); // Log the variation in execution times of the fastest implementation
//     console.log(
//       "Number of samples:",
//       this.filter("fastest").map("stats.sample.length")
//     ); // Log the number of samples collected for the fastest implementation
//   })

//   .run();

const data = {
    products: [
        {
            id:"ae",
            n:undefined,
            abc:undefined,
            a:null,
            b:123
        },
        {
            id:"ae",
            n:undefined,
            abc:undefined,
            a:null,
            b:123
        },
        {
            id:"ae",
            n:undefined,
            abc:undefined,
            a:null,
            b:123
        }
    ]
}

// suite
//   .add('Cart#cartRmOld', function () {
//     new CartRmOld(data)
//   })
//   .add('Cart#carRmNew', function () {
//     new CartRmNew(data)
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run({ async: true });

suite
  .add('Cart#cartGetPriceOld', function () {
    new CartGetPriceOld(database)
  })
  .add('Cart#cartGetPriceNew', function () {
    new CartGetPriceNew(database)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });

