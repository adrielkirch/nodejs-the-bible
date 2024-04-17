import { Duplex, Transform } from "stream";

let count = 0;
/**
 * A Duplex stream that reads and writes data.
 * @extends Duplex
 */
const server = new Duplex({
  objectMode: true,
  encoding: "utf-8",

  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Adriel ${count}`);
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(() => {
      everySecond(this);
    }, 1000); 
  },

  write(chunk,enconding,cb) {
    console.log(`[Writable] saving ${chunk}`)
    cb();
  },
});

//Write triggers duplex's writable
server.write('[Duplex] hey this is a writable:')

//On data -> is trigger when happens the readable .push()
server.on('data',msg => console.log(`[Readble]${msg}\n`))

// server.pipe(process.stdout);

//Push allows you to send more data
server.push(`[duplex] hey this is also a readable`)

//Transform is also a duplex, but it doesn't have independent communication
const trasformToUpperCase = Transform({
    objectMode:true,
    transform(chunk,encoding,cb) {
        cb(null,chunk.toUpperCase())
    }
})

//Both 
trasformToUpperCase.write('[transform] hello from transform write')
//Push will ignore what you have on transform function
trasformToUpperCase.push('[transform] hello from transform push\n')


//Redirect all dada from readable to duplex's writable
server
.pipe(trasformToUpperCase)
.pipe(server)