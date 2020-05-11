import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@atmosphericb/common';
import cookieSession from 'cookie-session';
import { createOrderRouter } from '../src/routes/new';
import { showOrderRouter } from '../src/routes/show';
import { indexOrderRouter } from '../src/routes/index';
import { deleteOrderRouter } from '../src/routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.get('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
