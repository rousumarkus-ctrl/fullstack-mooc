import { useState,useEffect } from 'react'
import personService from "./services/personsService"
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState("error")

  const setTimer = (message,type) => {
    console.log(message)
    setMessage(message)
    setType(type)
    setTimeout(()=>{
      setMessage(null)
    },5000)
  }

  useEffect(() => {
    personService.getAll()
      .then(returned =>{
        setPersons(returned)
      }).catch("Getting persons failed","error")
  }, [])

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name:newName,
      number:newNumber
    }
    if (persons.some((p)=>p.name === person.name)){
      const id = persons.find(p=>p.name===person.name).id
      if(confirm(`${person.name} is already added to phonebook,replace the old number with a new one?`)){
        personService.update(id,person)
          .then(returnedPerson =>{
            setTimer(`${person.name} number was changed`,"success")
            setPersons(persons.filter(p=>p.id!==id).concat(returnedPerson))
          })
          .catch(()=>{
            setTimer(`${person.name} was already removed from server`,"error")
            setPersons(persons.filter(p=>p.id!==id))
          })
      }
    }else{
      console.log('button clicked', event.target)
      personService.create(person)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setTimer(`${person.name} was added`,"success")
        }).catch(()=>setTimer(`${person.name} couldn't be added`,"error"))
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = ({name,id}) => {
    if(confirm(`Delete ${name} ?`)){
      personService.del(id).then(()=>{
        setTimer(`${name} was deleted`,"success")
      }).catch(()=>setTimer(`${name} was already removed from server`,"error"))
      setPersons(persons.filter(p=>p.id!==id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type}></Notification>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}></Persons>
    </div>
  )

}

export default App