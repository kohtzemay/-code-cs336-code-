const express = require('express');
const app = express();
const port = 3000;
const people = require('./data.json');

app.get('/people', function (req, res) {
  res.status(200).json(people);
})

app.get('/people/:id', function (req, res) {
  if (people.find(x => x.loginID === req.params.id)) {
    res.status(200).json(people.find(x => x.loginID === req.params.id))
  }
  res.status(404).send("404: Person not found :(");
})

app.get('/people/:id/name', function (req, res) {
  if (people.find(x => x.loginID === req.params.id)) {
    var firstName = people.find(x => x.loginID === req.params.id).firstName;
    var lastName = people.find(x => x.loginID === req.params.id).lastName;
    res.status(200).json({ "fullName": firstName + " " + lastName });
  }
  res.status(404).send("404: Person not found :(");
})

app.get('/people/:id/years', function (req, res) {
  if (people.find(x => x.loginID === req.params.id)) {
    var today = new Date();
    var startDate = new Date(people.find(x => x.loginID === req.params.id).startDate);
    var duration = today.getYear() - startDate.getYear();
    res.status(200).json({ "seniority": duration });
  }
  res.status(404).send("404: Person not found :(");
})

app.get('/', (req, res) => res.send('Hello World!'));

app.get('*', function (req, res) {
  res.status(404).send("404: Page not found :(");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
