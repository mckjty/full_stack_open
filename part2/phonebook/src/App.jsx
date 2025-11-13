import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PrintPerson from './components/PrintPerson'
import Message from './components/Message'
import Services from "./services/server"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [message, setMessage] = useState({content: null, type: null})

  useEffect(() => {
    Services.getAll()
    .then(res => setPersons(res))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Message message={message.content} type={message.type} />}
      <Filter newSearchTerm={newSearchTerm} setNewSearchTerm={setNewSearchTerm} />
      <h3>Add a new person</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber}
      setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} setMessage={setMessage} />
      <h3>Numbers</h3>
      <PrintPerson persons={persons} newSearchTerm={newSearchTerm} setPersons={setPersons} />
    </div>
  )
}

export default App