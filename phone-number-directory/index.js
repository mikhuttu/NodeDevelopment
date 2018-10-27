const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))

const formatFunction = (tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.body(req),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms'
].join(' ')

app.use(bodyParser.json())
app.use(morgan(formatFunction))
app.use(cors())
app.use(express.static('frontend-build'))


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))

app.get("/info", (request, response) => {
  Person
  .find({})
  .then(people => {

    const html =
    "<div>" +
      `puhelinluettelossa ${people.length} henkilön tiedot` +
    "</div>" +
    "<br>" +
    "<div>" +
      `${new Date()}` +
    "</div>"

    response.send(html)
  })
})

const peoplePath = "/api/persons"

app.get(peoplePath, (request, response) => {
  Person
  .find({})
  .then(people =>
    response
    .status(200)
    .json(people.map(Person.format))
  )
})

app.get(peoplePath + "/:id", (request, response) => {
  Person
  .findById(request.params.id)
  .then(person => person ?
      personAsJson(response, 200, person) :
      errorAsJson(response, 404, `Person by id '${request.params.id}' not found`)
  )
  .catch(_ => errorAsJson(response, 400, `Malformed id '${request.params.id}' provided`))
})

app.post(peoplePath, (request, response) => {
  const body = request.body

  if (! body.name) {
    errorAsJson(response, 400, "The 'name' must be provided")
  } else if (! body.number) {
    errorAsJson(response, 400, "The 'number' must be provided")
  } else {
    Person
    .findOne({'name': body.name})
    .then(foundPerson => {

      if (! foundPerson) {
        new Person({ ...body })
        .save()
        .then(person => personAsJson(response, 201, person))
      } else {
        errorAsJson(response, 400, `A person with name '${body.name}' already exists`)
      }
    })
  }
})

app.put(peoplePath + "/:id", (request, response) => {
  const number = request.body.number

  if (number) {
    Person
    .findById(request.params.id)
    .then(person => {
      if (! person) {
        errorAsJson(response, 404, `Person by id '${request.params.id}' not found`)
      } else {
        const updatedPersonData = { ...person._doc, number }

        Person
          .findByIdAndUpdate(request.params.id, updatedPersonData, { new: true })
          .then(updatedPerson => personAsJson(response, 200, updatedPerson))
      }
    })
    .catch(_ => errorAsJson(response, 400, `Malformed id '${request.params.id}' provided`))
  } else {
    errorAsJson(response, 400, "The 'number' must be provided")
  }
})

app.delete(peoplePath + "/:id", (request, response) => {
  Person
  .findByIdAndRemove(request.params.id)
  .then(_ => response.status(204).end())
  .catch(_ => errorAsJson(response, 400, `Malformed id '${request.params.id}' provided`))
})

const personAsJson = (response, statusCode, person) => {
  response.status(statusCode).json(Person.format(person))
}

const errorAsJson = (response, statusCode, errorMsg) => {
  errorMsg ?
    response.status(statusCode).json({'error': errorMsg}) :
    response.status(statusCode)
}
