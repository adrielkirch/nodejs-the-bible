import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import { dirname } from 'path';

// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp';
import Piscina from 'piscina';

const SERVER_PORT = 3000;
const CURRENT_FOLDER = dirname(fileURLToPath(import.meta.url));
const WORKER_FILE_NAME = 'worker.js';

//Worker threads usually is awesome for tasks which uses more cpu and memory, once it is divided into multiple workers threads.
async function joinImagesWorker(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${CURRENT_FOLDER}/${WORKER_FILE_NAME}`);
    worker.postMessage(images);
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== 0) {
        return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}!`));
      }

      console.log(`The thread ${worker.threadId} exited!`);
    })
  });
}

async function joinImages(images) {
  try {
    return await Piscina.run(images);
  } catch (error) {
    return new Error(`An error has occurred: ${error}`);
  }
}

async function handler(request, response) {
  if (request.url.includes('joinImages')) {
    const { query: { img, background } } = parse(request.url, true);
    // console.log({ img, background });

    const imageBase64 = await joinImages({
      image: img,
      background
    });

    response.writeHead(200, {
      'Content-Type': 'text/html'
    });

    response.end(`<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`);
    return;
  }

  return response.end('ok');
}

createServer(handler)
  .listen(SERVER_PORT, () => console.log(`running at ${SERVER_PORT}`));




















// https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Ftransparent-skull-png%2Ftransparent-skull-png-23.png&f=1&nofb=1&ipt=63bce699468127c83f6016334796b152b62cc170ee2ce5ff33047891bda38b0e&ipo=images
// https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F3%2FPredator-PNG-Pic.png&f=1&nofb=1&ipt=4c89ecf7f027f2e5d47eef6a7483258ac7a63f780a4aa21150250359d72afb1a&ipo=images

// backgrounds
// https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2460786.jpg&f=1&nofb=1&ipt=41b33d1b23c15400fe4bb20bec4457aeee19bb8f06699d6ab9f8276cbb575a0f&ipo=images
// https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp1822724.jpg&f=1&nofb=1&ipt=f3874baff816265090a4adf4f1b7587223a3830bea491340aaf12e609becbe33&ipo=images
