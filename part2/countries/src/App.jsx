import { useState, useEffect } from 'react'
import Search from "./components/Search"
import Services from "./services/server"
import PrintCountries from "./components/PrintCountries"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

    useEffect(() => {
    Services.getAll()
    .then(res => {
      const countryNames = res.map(c => c.name.common)
      setCountries(countryNames)
    }
    )
  }, [])

  return (
      <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PrintCountries countries={countries} searchTerm={searchTerm} />
      </>
  )
}

export default App