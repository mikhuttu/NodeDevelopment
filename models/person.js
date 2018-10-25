if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const dbUrl = process.env.MONGODB_URI

const mongoose = require('mongoose')
mongoose.connect(dbUrl)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.format = (person) => {
  const formatted = { id: person._id, ...person._doc }
  delete formatted._id
  delete formatted.__v

  return formatted
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person