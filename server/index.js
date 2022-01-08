const express = require('express');
const app = express();
app.use(express.json());
var compression = require('compression');
app.use(compression());
const port = 3000;

const fs = require('fs');
app.use(express.static('./public/'));

const { getProduct, getProducts, getReview, getRelated, getQuestions } = require('./fetch.js');

app.get('/messages', (req, res) => {
  fs.readFile('./server/messages.txt', 'utf8', (err, data) => {
    let arr = data.split('\n');
    res.json({ message: arr[Math.floor(Math.random() * arr.length)] });
  });
});

app.get('/products/:id', async (req, res) => {
  let product_id = req.params.id;
  try {
    let data = await getProduct({ product_id });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/products', async (req, res) => {
  try {
    let data = await getProducts();
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/reviews/:id', async (req, res) => {
  let product_id = req.params.id;

  try {
    let data = await getReview({ product_id });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/related/:id', async (req, res) => {
  let product_id = req.params.id;
  try {
    let data = await getRelated({ product_id });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/questions/:id', async (req, res) => {
  let product_id = req.params.id;
  try {
    let data = await getQuestions({ product_id });
    res.json(data);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
