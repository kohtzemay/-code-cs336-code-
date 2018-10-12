const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Exercise 6.1
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

// Exercise 6.2 - HTML forms
app.post('/my-handling-form-page', (req, res) => res.send({"success": "Hello, POST!",  "user_name": req.body.user_name, "user_mail": req.body.user_mail, "user_message": req.body.user_message}));


app.all('*', function(req, res) {
  if (req.url === '/request') {
      res.status(200);
  }
  res.status(404).send("404 Page not found :(");
}
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
