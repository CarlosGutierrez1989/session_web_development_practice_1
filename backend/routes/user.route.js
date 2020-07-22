const express = require('express');
const app = express();
const userRoute = express.Router();

// User Model
let User = require('../models/User');

// Create a new User
userRoute.route('/create').post((req, res, next) => {
  User.findOne({name: req.body.name}, function (err, items) {
	if(items == null) {
      User.create(req.body, (error, data) => {
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

//Get all users
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get user by id
userRoute.route('/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//GET Login User 
userRoute.post('/login', function (req, res) {

    User.findOne({name: req.body.name}, function (err, items) {

	if(err) {
		return res.status(500).send('findOne error:', err);
    }else {

      try {
        if(items == null){
          return res.status(500).send('findOne error:', err);
        }

        if(req.body.password == items.password){
          return res.status(200).send(items);
        }else{
          return res.status(500).send('Something broke!');
        }

    } catch (err) {
      return res.status(500).send('findOne error:');
    }
         }
    });
})

userRoute.route('/read').get((req, res, next) => {
  User.findOne({name: req.body.name}, req.body.name, (error, data) => {
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



// Update User
userRoute.route('/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
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

// Delete employee
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;