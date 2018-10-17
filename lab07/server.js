const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static("."));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("Hello, world!"));
app.get('/hello', (req, res) => res.send("Hello, lab7!"));
app.post('/hello', (req, res) => res.status(200).send({html: "Hello, ", name: req.body.name }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
