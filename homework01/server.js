const express = require('express');
const app = express();
const port = 3000;
const people = require('./data.json');

// GET method for '/people' endpoint: returns a list of all the people
app.get('/people', function (req, res) {
  res.status(200).json(people);
})

// Returns all the information of the person matching the requested id
app.get('/person/:id', function (req, res) {
  if (people.find(x => x.loginID === req.params.id)) {
    res.status(200).json(people.find(x => x.loginID === req.params.id))
  } else {
    res.status(404).send("404: Person not found :(");
  }
})

// Returns the full name of the person matching the requested id
app.get('/person/:id/name', function (req, res) {
  if (people.find(x => x.loginID === req.params.id)) {
    var firstName = people.find(x => x.loginID === req.params.id).firstName;
    var lastName = people.find(x => x.loginID === req.params.id).lastName;
    res.status(200).json({ "fullName": firstName + " " + lastName });
  } else {
    res.status(404).send("404: Person not found :(");
  }
})

// Returns the number of years the person matching the requested id has worked
app.get('/person/:id/years', function (req, res) {
  if (people.find(x => x.loginID === req.params.id)) {
    var today = new Date();
    var startDate = new Date(people.find(x => x.loginID === req.params.id).startDate);
    var duration = today.getYear() - startDate.getYear();
    res.status(200).json({ "seniority": duration });
  } else {
    res.status(404).send("404: Person not found :(");
  }
})

app.get('/', (req, res) => res.send('Hello World!'));

// Gives a 404 not found status if an unspecified route is hit
app.get('*', function (req, res) {
  res.status(404).send("404: Page not found :(");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
