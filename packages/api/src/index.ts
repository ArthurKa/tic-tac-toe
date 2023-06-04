import express from 'express';
import { createServer } from 'http';
import { PORT } from './envVariables';
import { connectSocket } from './connectSocket';

const app = express();
const server = createServer(app);

connectSocket(server);

server.listen(PORT, () => {
  console.info(`Listening on http://localhost:${PORT}`);
});
