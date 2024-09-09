import Benchmark from 'benchmark';

interface Item {
  price: number;
}

const database = { /* mock database object */ };

function cartGetPriceA(items: Item[]): number {
  return items.map(item => item.price).reduce((total, price) => total + price, 0);
}

function cartGetPriceB(items: Item[]): number {
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
  .on('cycle', function (event: Benchmark.Event) {
    console.log(String(event.target));
  })
.on('complete', function (this: Benchmark.Suite) {  // Declare 'this' type explicitly
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
  .run({ async: true });
