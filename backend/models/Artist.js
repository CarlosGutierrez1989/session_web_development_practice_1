const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Artist = new Schema({

    name: {
      type: String
   },
   href: {
      type: String
   }
}, {
   collection: 'Artist'
})

module.exports = mongoose.model('Artist', Artist)