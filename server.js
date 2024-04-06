/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const host = process.env.MICROSERVICE_HOST || '0.0.0.0';
const port = process.env.MICROSERVICE_PORT || '8080';

const HASURA_REST_ENDPOINT =
  process.env.MICROSERVICE_HASURA_REST_ENDPOINT || '';
const API_KEY = process.env.MICROSERVICE_API_KEY;
const HASURA_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

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

apiRouter.post('/user/details', async (req, res) => {
  try {
    const { username } = req.body;

    const { users } = await fetch(
      `${HASURA_REST_ENDPOINT}/get-user-details/${username}`,
      { headers: { 'x-hasura-admin-secret': HASURA_ADMIN_SECRET } },
    ).then(data => data.json());

    if (users.length === 0)
      return res.status(400).send({ message: 'User Not Found' });

    return res.status(200).send({
      user_id: users[0].id,
      group_name: users[0].groups[0].user_group.name,
      group_id: users[0].groups[0].user_group.id,
    });
  } catch (e) {
    return res
      .status(400)
      .send({ message: 'Internal Server Error', e: JSON.stringify(e) });
  }
});

const server = createServer(app).listen({ host, port }, () => {
  const addressInfo = server.address();
  console.log(
    `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
  );
});
