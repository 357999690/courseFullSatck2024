require( 'dotenv' ).config()
const express = require(' express ')
const app = express()
const morgan = require(' morgan ')
const cors = require(' cors ')
const Person = require(' ./models/person ')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('req-body', (request) => {
  return JSON.stringify(request.body)
})
app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :req-body'))



app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  let date = new Date()

  Person.find({}).then( persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next (error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body



  Person.findByIdAndUpdate(
    request.params.id,
    { name, number }
    ,{ new: true, runValidators: true, context: 'query' }
  )
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'name is to short' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})