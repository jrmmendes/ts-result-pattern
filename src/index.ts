import express from 'express';
import morgan from 'morgan';
import { Database } from './db';

const app = express();

type PaginationContext = {
  query: { limit: number }
}
app.use(morgan('dev'));
app.get('/users/:id', (req, res) => {
  const result = Database.findUser(req.params.id);

  if (result.isSuccess) {
    return res.status(200).send({
      user: result.value,
    });
  }

  return res.status(404).send({
    message: result.reason,
  });
});

app.get('/users', (req: express.Request & PaginationContext, res) => {
  const result = Database.users(req.query.limit);

  result
    .onSuccess((value) => res.status(200).send({
      users: value,
    }))
    .onFailure(() => res.status(404).send({
      message: result.reason,
    }))
})

app.listen(
  3000,
  () => console.log('[EXPRESS] Application started at http://localhost:3000')
);