var express = require('express');
var router = express.Router();
var puppyArray = [];
var peopleArray = [];

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/submit', function(req,res, next) {
  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;
  var errors = validationCheck(puppyInputName, puppyInputID);
  if (errors.length > 0) {
    res.render('index', {
      errors: errors
    });
  } else {
    puppyArray.push({
      name: puppyInputName,
      id: puppyInputID
    });
    res.render('result', {
      puppies: puppyArray,
      success: "Your item was saved successfully!",
      people: peopleArray,
    });
  }
});

router.post('/person', function(req,res, next) {
  var personInputName = req.body.personName;
  var personHobby = req.body.hobby;
  var errors = validationCheck(personInputName, personHobby);
  if (errors.length > 0) {
    res.render('index', {
      errors: errors
    });
  } else {
    peopleArray.push({
      name: personInputName,
      hobby: personHobby
    });
    res.render('result', {
      people: peopleArray,
      puppies: puppyArray,
      success: "Your item was saved successfully!"
    });
  }
});

function validationCheck(input1, input2) {
  var errorArray = [];
  var input1Trimmed = input1.trim();
  var input2Trimmed = input2.trim();
  if(input1Trimmed === '') {
    errorArray.push("Name cannot be blank.");
  }
  if(input2Trimmed === '') {
    errorArray.push('Id cannot be blank.');
  } else if (input2Trimmed.length < 3) {
    errorArray.push('A Id must be at least 3 characters long.');
  }
  return errorArray;
};

module.exports = router;
