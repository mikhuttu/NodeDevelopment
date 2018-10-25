require('dotenv').config()

const dbUrl = process.env.MONGODB_URI

if (! dbUrl) {
  console.log("Environment variable MONGODB_URI not defined.")
} else {
  const mongoose = require('mongoose')
  mongoose.connect(dbUrl)

  const Person = mongoose.model('Person', {
    name: String,
    number: String
  })

  const name = process.argv[2]
  const number = process.argv[3]

  if (number) {
    new Person({ name, number })
    .save()
    .then(result => {
      console.log(`Henkilö "${name}", numero "${number}", lisättiin puhelinluetteloon`)
      mongoose.connection.close()
    })
  } else {
    Person
    .find({})
    .then(people => {
      console.log("puhelinluettelo:")
      people.forEach(person => console.log(person))

      mongoose.connection.close()
    })
  }
}
