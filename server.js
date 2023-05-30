import express from 'express';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
