const express = require('express');
const app = express();
const songsRoute = express.Router();

// Song model
let Song = require('../models/Song');

var ObjectId = require('mongoose').Types.ObjectId; 

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

// Song like by id
songsRoute.route('/like/:_id').put((req, res, next) => {
  Song.findOneAndUpdate({_id: req.params._id}, {$set:{like: true}}, (error, data) => {

	console.log(data)
	 if (error) {
        console.log("Something wrong when updating data!");
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
});

// Song dislike by id
songsRoute.route('/dislike/:_id').put((req, res, next) => {
  Song.findOneAndUpdate({_id: req.params._id}, {$set:{like: false}}, (error, data) => {

	console.log(data)
	 if (error) {
        console.log("Something wrong when updating data!");
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
});

// Update 
/*
songsRoute.route('/dislike/:id').put((req, res, next) => {
  Song.findByIdAndUpdate(req.params.id, {
    like: false
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
*/

// Create song
songsRoute.route('/create').post((req, res, next) => {

  Song.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All
songsRoute.route('/').get((req, res) => {
  Song.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get song by id
songsRoute.route('/read/:id').get((req, res) => {
  Song.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update by id
songsRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete by id
songsRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = songsRoute;