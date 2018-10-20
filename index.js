const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let people = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get("/info", (request, response) => {
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


const peoplePath = "/api/persons"

app.get(peoplePath, (request, response) => {
  response.json(people)
})

app.get(peoplePath + "/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post(peoplePath, (request, response) => {
  const generateId = () => Math.floor((Math.random() * 10000000000))

  const body = request.body
  let error;

  if (people.find(p => p.name === body.name)) {
    error = `A person with name ${body.name} already exists.`
  } else if (body.name === undefined) {
    error = "The person name must be provided."
  } else if (body.number === undefined) {
    error = "The phone number must be provided."
  }

  if (error === undefined) {
    const person = { id: generateId(), ...body }
    people = people.concat(person)

    response.json(person)
  } else {
    response.status(400).json({error})
  }
})

app.delete(peoplePath + "/:id", (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(p => p.id !== id)

  response.status(204).end()
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})