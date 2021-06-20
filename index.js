import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('hello express');
});

app.get('/about', (req, res) => {
  res.json({
    name: 'Greg Lim',
  });
});
