const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Song = new Schema({

   name: {
      type: String
   },
   external_url: {
      type: String
   },
   image: {
      type: String
   },
    release_date: {
      type: String
   },
   duration_ms: {
      type: String
   },
   popularity: {
      type: String
   },
   like: {
	   type: Boolean
   },
   artists: [{
          name: {
      type: String
	   },
	   href: {
		  type: String
	   }
   }]
}, {
   collection: 'Song'
})


let Artist = new Schema({
   _id: {
      type: String
   },
    name: {
      type: String
   },
   href: {
      type: String
   }
})
module.exports = mongoose.model('Song', Song)