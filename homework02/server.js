const express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
const listOfPeople = require('./data.json');
const port = 3000;
const app = express();

var PEOPLE_FILE = path.join(__dirname, 'data.json');

app.use(express.static("."));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gets and returns a list of all the people in data.json
app.get('/people', function (req, res) {
  res.status(200).json(listOfPeople);
})

// Posts new person data collected from the HTML form to data.json
app.post('/people', function(req, res) {
  fs.readFile(PEOPLE_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      var people = JSON.parse(data);
      var newPerson = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          loginID: req.body.loginID,
          startDate: req.body.startDate
      };
      people.push(newPerson);

      fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
          if (err) {
              console.error(err);
              process.exit(1);
              res.status(500).send({ msg: "Oops, an error occurred." })
          } else {
              res.status(200).send({ msg: "Person successfully added!" });
          }
      });
  });
})

// Gets and returns all the information of the person matching the requested id
app.get('/person/:id', function (req, res) {
  if (listOfPeople.find(x => x.loginID === req.params.id)) {
    var person = listOfPeople.find(x => x.loginID === req.params.id)
    res.status(200).send({ msg: person });
  } else {
    res.status(404).send({ msg: "404: Person not found :(" });
  }
})

// Updates the information of the person matching the requested id
app.put('/person/:id', function (req, res) {
  if (listOfPeople.find(x => x.loginID === req.params.id)) {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        var people = JSON.parse(data);
        var index = people.findIndex(obj => obj.loginID === req.params.id);
        people[index].firstName = req.body.firstName;
        people[index].lastName = req.body.lastName;
        people[index].loginID = req.body.loginID;
        people[index].startDate = req.body.startDate;

        fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
                res.status(500).send({ msg: "Oops, an error occurred." })
            } else {
                res.status(200).send(people);
            }
        });
    });
  } else {
    res.status(404).send("404: Person not found :(");
  }
})


// Deletes the information of the person matching the requested id
app.delete('/person/:id', function (req, res) {
  if (listOfPeople.find(x => x.loginID === req.params.id)) {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        var people = JSON.parse(data);
        var index = people.findIndex(obj => obj.loginID === req.params.id);
        people.splice(index, 1);

        fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
                res.status(500).send({ msg: "Oops, an error occurred." })
            } else {
                res.status(200).send(people);
            }
        });
    });
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
