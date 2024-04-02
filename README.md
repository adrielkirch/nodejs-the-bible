# Node.js The Bible

Welcome to Node.js: The Bible repository, your comprehensive guide to mastering Node.js development from scratch to advanced topics. Whether you're a beginner looking to understand the basics or an experienced developer seeking to deepen your knowledge, this repository is designed to be your go-to resource.

## Course repository organization

This repository is organized into modules, each covering different aspects of Node.js development. Within each module, there are individual lessons that delve into specific topics or concepts related to Node.js. Each lesson is accompanied by its own set of files, which may include code examples, explanations, exercises, quizzes, or other relevant material.

## Install necessary dependecies

```npm install ```

## Start server

To start the server for a particular lesson, you can use the npm start command followed by the path to the app.js file within the desired lesson directory. This ensures that the server defined in that specific app.js file is launched. Exemple the first lesson which it's used a app.js in "Express.js introduction"

``` cd 1_javascript/ ```
``` npm start ./2_module_express/1_lesson_express_introduction/app.js ```

## Test 

To test a file for a particular lesson, you can use the npm start command followed by the path to the actual test, within the desired lesson directory.

``` cd 1_javascript/ ```
```npm run test ./2_module_express/3_lesson_soa_architecture/test.js```

## What is Node.js?

Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser.

## Why Use Node.js?

1. **Asynchronous event-driven IO**: Helps concurrent request handling – This is in contrast to today's more common concurrency model where OS threads are employed. Thread-based networking is relatively inefficient and very difficult to use.

2. **Superfast**: Built on Google Chrome's V8 JavaScript Engine, Node.js library is very fast in code execution.

3. **Single Threaded but Highly Scalable**: Node.js uses a single threaded model with event looping.

4. **No Buffering**: Node.js applications never buffer any data. These applications simply output the data in chunks.

5. **License**: Node.js is released under the MIT license.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

<a href="https://nodejs.org/en/download">Download node.js here</a>
