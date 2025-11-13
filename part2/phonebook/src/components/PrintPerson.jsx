 import Services from "../services/server"
 
const removePerson = (persons, id, setPersons) => {
      const person = persons.find(p => p.id === id)
      if (window.confirm("Delete " + person.name + "?")) {
        Services.deletePerson(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== id))
        })
      }
    }

const PrintPerson = ({persons, newSearchTerm, setPersons}) => {
    return (
        persons
            .filter((x) => x.name.toLowerCase().includes(newSearchTerm.toLowerCase()))
            .map(x => {
                return (
                    <div key={x.id}>
                    <p>{x.name} {x.number}</p>
                    <button onClick={() => removePerson(persons, x.id, setPersons)}>delete</button>
                    </div>
                )
            })
    )
}

export default PrintPerson