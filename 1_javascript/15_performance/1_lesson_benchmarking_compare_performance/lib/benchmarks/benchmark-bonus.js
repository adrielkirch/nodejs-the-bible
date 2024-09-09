const Benchmark  = require('benchmark');

const database = { /* mock database object */ };

function cartGetPriceA(items) {
  return items.map(item => item.price).reduce((total, price) => total + price, 0);
}

function cartGetPriceB(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const suite = new Benchmark.Suite();

suite
  .add('Cart#cartGetPriceA', function () {
    cartGetPriceA([{ price: 10 }, { price: 15 }, { price: 20 }]);
  })
  .add('Cart#cartGetPriceB', function () {
    cartGetPriceB([{ price: 10 }, { price: 15 }, { price: 20 }]);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
