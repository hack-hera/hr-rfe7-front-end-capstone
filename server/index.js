const express = require('express');
const app = express();
app.use(express.json());
var compression = require('compression');
app.use(compression());
const port = 3000;

app.use(express.static('./public/'));

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
