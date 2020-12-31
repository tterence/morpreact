import http2 from 'http2';
import express from 'express';
import { resolve } from 'path';

const { PORT: port } = process.env;
const app = express();
app.use('/', express.static(resolve(process.cwd(), '/dist')))
const server = http2.createServer({}, app);
server.listen(port ?? 4000, () => {
    console.info('Listening to: ', port);
})