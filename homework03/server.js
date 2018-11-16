const express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;
const port = 3000;

app.set('port', (process.env.PORT || 3000));

app.use(express.static("."));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gets and returns a list of all the people in data.json
app.get('/people', function (req, res) {
  db.collection('people').find().toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

// Posts new person data collected from the HTML form to data.json
app.post('/people', function(req, res) {
  try {
    db.collection('people').insertOne(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginID: req.body.loginID,
        startDate: req.body.startDate
      }
    );
  }
  catch (err) {
    res.status(500).send({ msg: err });
  }
  res.status(200).send({ msg: "Person successfully added!" });
});

// Gets and returns all the information of the person matching the requested id
app.get('/person/:id', function (req, res) {
  db.collection('people').findOne(
    { loginID: req.params.id },
    function(err, result) {
      if (err) throw err;
      if (!result) {
        res.status(404).send({ msg: "Person not found." });
      } else {
        res.status(200).send({ msg: result });
      }
    }
  );
});

// Updates the information of the person matching the requested id
app.put('/person/:id', function (req, res) {
  db.collection('people').updateOne(
    { loginID: req.params.id },
    { $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      loginID: req.body.loginID,
      startDate: req.body.startDate
    }},
    function(err, result) {
      if (err) throw err;
      if (result.result.n == 0) {
        res.status(404).send({ msg: "Person with specified loginID doesn't exist!" });
      } else {
        res.status(200).send({ msg: "Person successfully updated!" });
      }
    }
  );
});


// Deletes the information of the person matching the requested id
app.delete('/person/:id', function (req, res) {
  db.collection('people').deleteOne(
    { loginID: req.params.id },
    function(err, result) {
      if (err) throw err;
      if (result.result.n == 0) {
        res.status(404).send({ msg: "Person with specified loginID doesn't exist!" });
      } else {
        res.status(200).send({ msg: "Person successfully deleted!" });
      }
    }
  )
});

// Returns the full name of the person matching the requested id
app.get('/person/:id/name', function (req, res) {
  db.collection('people').findOne(
    { loginID: req.params.id },
    function(err, result) {
      if (err) throw err;
      if (!result) {
        res.status(404).json("Person not found.");
      } else {
        res.status(200).json({ fullName: result.firstName + ' ' + result.lastName });
      }
    }
  );
});

// Returns the number of years the person matching the requested id has worked
app.get('/person/:id/years', function (req, res) {
  var today = new Date();

  db.collection('people').findOne(
    { loginID: req.params.id },
    function(err, result) {
      if (err) throw err;
      if (!result) {
        res.status(404).json("Person not found.");
      } else {
        var startDate = new Date(result.startDate);
        var duration = today.getYear() - startDate.getYear();
        res.status(200).json({ "seniority": duration });
      }
    }
  );
})

app.get('/', (req, res) => res.send('Hello World!'));

// Gives a 404 not found status if an unspecified route is hit
app.get('*', function (req, res) {
  res.status(404).send("404: Page not found :(");
})

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds155073.mlab.com:55073/cs-336', function (err, client) {
  if (err) throw err;

  db = client;

  app.listen(app.get('port'), function() {
      console.log('Server started: http://localhost:' + app.get('port') + '/');
  });

})
