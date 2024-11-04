import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
// import axios from "axios";
import personServices from "./services/persons";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findName, setFindName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    const nameExist = persons.filter(person => person.name === newName)

    let text = `${newName} is already added to phonebook, replace the old number with a new one?`

    if(nameExist.length >=1 && confirm(text)) {
      // console.log(nameExist)
      personServices
        .update(nameExist[0].id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== nameExist[0].id ? p : returnedPerson))
          setMessage(`Changed ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== nameExist[0].id))
        } )
    } else {
      
        personServices
          .create(personObject)
          .then(person => {
            setPersons(persons.concat(person))
            setMessage(`Added ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        
    }

    setNewName('')
    setNewNumber('')
    
    // if(nameExist.length >= 1) {
    //   let text = `${newName} is already added to phonebook, replace the old number with a new one?`
    //   confirm(text) ?
    //     personServices
    //       .update(nameExist.id, personObject)
    //       .then(returnedPerson => {
    //         setPersons(persons.map(p => p.id !== nameExist.id ? p : returnedPerson))
    //       }) :
    //       personServices
    //   .create(personObject)
    //   .then( person => {
    //     setPersons(persons.concat(person))
    //     setNewName('')
    //     setNewNumber('')
    //   })
    //   //  return alert(`${newName} is already added to phonebook`)
    // }

    

    

    

    // setPersons(persons.concat(personObject))
    // setNewName('')
    // setNewNumber('')
  }

  const personDelete = id => {
    personServices
      .personsDelete(id)
      .then( pDelete => {
        setPersons(persons.filter(p => p.id !== pDelete.id))
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setFindName(event.target.value)
  }

  const filterName = persons.filter(person => person.name.toUpperCase().startsWith(findName.toUpperCase())).length >= 1 ?
    persons.filter(p => p.name.toUpperCase().startsWith(findName.toUpperCase())) :
    persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorMessage errorMessage={errorMessage}/>
      <Filter findName={findName} handleNameChange={handleNameChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filterName={filterName} personDelete={personDelete}/>
    </div>
  )
}

export default App