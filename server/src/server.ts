import express from 'express';
import routes from './routes';

const server = express();

server.use("/api", routes);

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});