const express = require('express');
const app = express();
const artistRoute = express.Router();


// Artist model
let Artist = require('../models/Artist');

// Create Artist
artistRoute.route('/create').post((req, res, next) => {
	Artist.findOne({name: req.body.name}, function (err, items) {
		console.log(items)
	if(items == null) {
      Artist.create(req.body, (error, data) => {
        console.log(data)
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }else {
      return res.status(500).send('Name already in use');
     }
    })

});


artistRoute.route('/').get((req, res) => {
  Artist.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Artist by id
artistRoute.route('/read/:_id').get((req, res, next) => {
	console.log(req.params._id)
  Artist.find({_id: req.params._id}, (error, data) => {

	console.log(data)
	 if (error) {
        console.log("Something wrong when updating data!");
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
});



artistRoute.route('/read').get((req, res, next) => {
  Artist.findOne({name: req.body.name}, req.body.name, (error, data) => {
	if(req.body.password == data.password){
		res.json(data)
	}else{
		return 'Error 1'
	}
	
    if (error) {
      return  'Error 2'
    } else {
      res.json(data)
    }
  })
})



// Update Artist
artistRoute.route('/update/:id').put((req, res, next) => {
  Artist.findByIdAndUpdate(req.params.id, {
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
artistRoute.route('/delete/:id').delete((req, res, next) => {
  Artist.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = artistRoute;