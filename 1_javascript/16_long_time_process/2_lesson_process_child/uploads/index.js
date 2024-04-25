import { spawn } from 'child_process'; // comandos do SO

const pythonFile = 'index.py';
const pythonCommand = 'python3';

async function requestPython({ url, headers, filePath }) {
  const py = spawn(pythonCommand, [
    pythonFile,
    JSON.stringify({ url, headers, filePath })
  ]);

  const dataString = [];

  for await (const data of py.stdout) {
    dataString.push(data.toString());
  }

  return dataString.join('');
}

const result = await requestPython({
  url: 'http://localhost:3000',
  headers: { 'content-type': 'json' },
  filePath: './my-data.csv'
});

console.log(`Result: `, result);