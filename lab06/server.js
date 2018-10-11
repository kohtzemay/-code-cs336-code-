const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/request', (req, res) => res.send(req.body));

app.post('/request', function(req, res) {
  res.send(req.body);
});

app.put('/request', function(req, res) {
  res.send(req.body);
});

app.delete('/request', function(req, res) {
  res.send(req.body);
});
app.head('/request', function(req, res) {
  res.send(req.body);
});

app.all('*', function(req, res) {
  if (req.url === '/request') {
      res.status(200);
  }
  res.status(404).send("404 Page not found :(");
}
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
