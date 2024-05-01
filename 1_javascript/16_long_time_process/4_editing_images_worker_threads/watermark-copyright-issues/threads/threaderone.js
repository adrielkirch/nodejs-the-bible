import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { workerData, parentPort } from 'worker_threads';

import ffmpeg from 'ffmpeg';

// let dest = "/dest/video.mp4";

const CURRENT_FOLDER = dirname(fileURLToPath(import.meta.url));

try {
  let process = new ffmpeg(workerData.file);

  process.then((video) => {
    video.fnAddWatermark(
      CURRENT_FOLDER + "/metallica.png",
      CURRENT_FOLDER + "/" + workerData.filename,
      {
        position: "C",
      },
      function (err, file) {
        console.log(err);
        console.log(file);
        if (err) {
          parentPort.emit({ error: `An error has ocurred: ${err}` });
        }

        console.log(`New video file is: ${file}`);
        parentPort.postMessage({ status: "Done", file: file });
      }
    );
  });
} catch (e) {
  console.log(e.code);
  console.log(e.msg);
}