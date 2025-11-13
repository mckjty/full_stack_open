import axios from 'axios'
import Services from "../services/server"

const PersonForm = ({persons, newName, newNumber, message, type, setNewName, setNewNumber, setPersons, setMessage}) => {
    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(x => x.name == newName) && 
        window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")) {
          const pID = persons.find(p => p.name == newName).id
          return (
            Services.putPerson(pID, personObject)
            .then( res => {
              setPersons(persons.map(p => p.id === res.id ? res : p))
              setNewName('')
              setNewNumber('')
              setMessage({content: 'Number for ' + persons.find(p => p.id === pID).name + " changed", type: "message"})
              setTimeout(() => { setMessage(null)}, 5000)
            })
            .catch(error => {
               setMessage({content: 'Information of ' + persons.find(p => p.id === pID).name + " has already been removed from server", type: "error"})
               setTimeout(() => { setMessage(null)}, 5000)
            })
      )
    }
    return (
    Services.postPerson(personObject)
      .then( res => {
        console.log(res)
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')
        setMessage({content: 'Added ' + res.name, type:"message"})
        setTimeout(() => { setMessage(null)}, 5000)
      })
    )
  }

    return (
        <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={handlePersonChange}/></p>
          <p>number: <input value={newNumber} onChange={handleNumberChange}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm