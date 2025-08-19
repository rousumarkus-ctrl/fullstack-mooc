const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(express.static('dist'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get('/info', (request, response) => {
    const time = new Date(Date.now())
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${time}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(p=>p.id === request.params.id)
    if (person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons',(request, response) =>{
    const person = {...request.body}
    if (!request.body.name){
        return response.status(400).json({error:"name missing"})
    }else if (!request.body.number){
         return response.status(400).json({error:"number missing"})
    }else if (persons.find(p=>p.name===person.name)){
        return response.status(400).json({error:"name must be unique"})
    }
    person.id = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString()
    persons.push(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})