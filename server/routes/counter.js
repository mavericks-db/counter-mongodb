const express = require('express');

const router = express.Router();
const Counter = require('../models/counter.model');
const db = require('../db');

router.get('/refresh', (req, res) => {
  Counter.findOne()
    .then((counts) => res.json(counts))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/reset', (req, res) => {
  db.collection('counters')
    .updateOne(
      {
        name: 'MyCounter',
      },
      {
        $set: {
          count: 0,
        },
      },
    )
    .then(() => {
      res.send({
        message: 'Reset counter',
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/increment', (req, res) => {
  db.collection('counters')
    .updateOne(
      {
        name: 'MyCounter',
      },
      {
        $inc: {
          count: 1,
        },
      },
    )
    .then(() => {
      res.send({
        message: 'Increment counter',
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/decrement', (req, res) => {
  db.collection('counters')
    .updateOne(
      {
        name: 'MyCounter',
      },
      {
        $inc: {
          count: -1,
        },
      },
    )
    .then(() => {
      res.send({
        message: 'Decrement counter',
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
