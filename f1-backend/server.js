import express from 'express';
import movement from './routes/movement.js';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/movement', movement);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});

