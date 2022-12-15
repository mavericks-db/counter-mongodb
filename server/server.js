const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const morgan = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const counterRouter = require('./routes/counter');
const db = require('./db');
const Counter = require('./models/counter.model');

mongoose.set('strictQuery', false);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
});

// Initialize database
db.once('open', () => {
  console.log('MongoDB database connection established successfully.');
  Counter.find({ name: 'MyCounter' }, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result) {
      console.log(result);
    }

    if (!result.length) {
      const initialCount = new Counter({
        name: 'MyCounter',
        count: 0,
      });
      initialCount.save();
    }
  });
});

app.use('/api', counterRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome',
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server started running at http://${process.env.HOST}:${process.env.PORT}`,
  );
});
