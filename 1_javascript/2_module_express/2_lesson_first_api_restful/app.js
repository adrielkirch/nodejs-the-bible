'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemon = require('nodemon');
const routes = require('./routes');

dotenv.config();

/**
 * Express server for handling HTTP requests and responses.
 *
 * This async server is built using Express.js, a web application framework for Node.js.
 * It provides a simple and minimalist web server that can handle HTTP requests,
 * define routes, and respond with data or render views.
 *
 * @summary Express server for handling HTTP requests and responses.
 * @description This server is built using Express.js, a web application framework for Node.js.
 * @since 1.0.0
 * @see {@link https://expressjs.com/ Express.js Documentation}
 *
 * @returns {Promise<void>} A Promise that resolves when the server has started successfully.
 */
async function startServer() {
    const app = express();    
    const port = process.env.PORT

    app.use(bodyParser.json());
    app.use('/items', routes);

    await app.listen(port);
    console.log(`Server is running on port ${port}`);
}

startServer();
