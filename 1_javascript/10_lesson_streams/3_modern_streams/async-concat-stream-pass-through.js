import axios from 'axios';
import { pipeline } from 'stream/promises';

const URL_API_01 = `http://localhost:3000`;
const URL_API_02 = `http://localhost:4000`;

const CONFIG_AXIOS = {
  method: 'get',
  responseType: 'stream'
};

const requests = await Promise.all([
  axios({
    ...CONFIG_AXIOS,
    url: URL_API_01
  }),
  axios({
    ...CONFIG_AXIOS,
    url: URL_API_02
  })
]);

const results = requests.map(({ data }) => data);

// writable stream
async function output(stream) {
  for await (const data of stream) {
    /**
     * ?=-            : procura a partir do - (hífen) e olha para trás
     * :"(?<name>.*)  : procura pelo conteúdo dentro das aspas após os : (dois pontos) 
     * e extrai somente o name (nome do grupo)
     */
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;

    console.log(`[${name.toLowerCase()}] ${data}`);
  }
}

// passThrough stream
async function* merge(streams) {
  /**
   * Não está resolvendo a stream... apenas navegando por ela, pois não tem o await.
   */
  for (const readable of streams) {
    // Faz trabalhar com o objectMode, para não precisarmos trabalhar com buffer.
    readable.setEncoding('utf8');

    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line;
      }
    }
  }
}

await pipeline(
  merge(results),
  output
);