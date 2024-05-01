import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';
import { isMainThread, Worker } from 'worker_threads';

import express from 'express';
import multer from 'multer';

config();

const CURRENT_FOLDER = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    const fileType = `.${file.originalname.match(/[^.]+$/)[0]}`;

    const finalFileName = `${file.fieldname}-${Date.now()}${fileType}`;

    // console.log(`final`, finalFileName);
    cb(null, finalFileName);
  },
});

const upload = multer({ dest: 'uploads', storage: storage });

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('views', CURRENT_FOLDER);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload-video', upload.single('ssvideo'), (req, res) => {
  // console.log(req.file);
  if (isMainThread) {
    // console.log(`req`, req);
    const image_url = join(CURRENT_FOLDER, '../threads', '/metallica.png');

    let thread = new Worker('./threads/threaderone.js', {
      workerData: {
        file: req.file.path,
        filename: req.file.filename,
        watermark_image_url: image_url,
      }
    });

    thread.on('message', (data) => {
      res.download(data.file, req.file.filename);
    });

    thread.on('error', (err) => {
      console.error('thread', err);
    });

    thread.on('exit', (code) => {
      if (code != 0) console.error(`Worker stopped with exit code ${code}`);
    });
  }
});

// TODO: You should create an .env file
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});