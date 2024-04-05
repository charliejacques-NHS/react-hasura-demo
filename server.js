/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const host = process.env.MICROSERVICE_HOST || '0.0.0.0';
const port = process.env.MICROSERVICE_PORT || '8080';

const API_KEY = process.env.MICROSERVICE_API_KEY;

function apiKeyMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const suppliedKey = authorization?.split(' ')[1];

  if (!API_KEY)
    return res
      .status(500)
      .send({ message: 'Internal Server Error: No API Key set up' });

  if (!suppliedKey)
    return res.status(401).send({ message: 'No API Key provided' });

  if (suppliedKey !== API_KEY) return res.status(401).send();

  next();
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.disable('x-powered-by');

app.get('/health', (_req, res) => {
  res.send({ status: 'UP' });
});

const apiRouter = express.Router();
apiRouter.use(apiKeyMiddleware);

app.use('/api', apiRouter);

apiRouter.post('/basket', (req, res) => {
  try {
    const { products } = req.body;

    const basketTotal = products
      .map(({ price }) => price)
      .reduce((acc, curr) => acc + curr);

    return res
      .status(200)
      .send({ message: `Your basket total is: £${basketTotal.toFixed(2)}` });
  } catch (e) {
    return res.status(400).send({ message: 'Products not supplied' });
  }
});

const server = createServer(app).listen({ host, port }, () => {
  const addressInfo = server.address();
  console.log(
    `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
  );
});
