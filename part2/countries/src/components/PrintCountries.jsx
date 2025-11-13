
import Services from "../services/server"
import { useState, useEffect } from "react"

const PrintCountries = ({countries, searchTerm}) => {
    const [countryDetail, setCountryDetail] = useState(null)

    const filteredCountries = countries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    const OneCountry = ({name, capital, area, languages, flags}) => {
        return (
            <>
            <h1>{name.common}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h2>Languages</h2>
            <ul>
            {Object.values(languages).map(l => (
                <li key={l}>{l}</li>
            ))} 
            </ul>
            <img src={flags.png} />
            </>
        )
    }

    const handleClick = (name) => {
        Services.getOne(name)
            .then(res => {
                setCountryDetail(res)
            })
    }

    useEffect(() => {
        if (filteredCountries.length === 1) {
            Services.getOne(filteredCountries[0])
                .then(res => { 
                    setCountryDetail(res)
                })
        } else {
            setCountryDetail(null)
        }
    }, [searchTerm])
    
    if (filteredCountries.length > 10 && !countryDetail) {
        return <p>Too many matches, specify another filter</p>
    }
    if (!countryDetail && filteredCountries.length > 1) {
        return (
            <>
            {filteredCountries.map(name => (
                <div key={name}>
                    <p>{name}</p><button type="button" onClick={() => handleClick(name)}>show</button>
                </div>
            ))}
            </>
        )
    }
    if (countryDetail) {    
    return (
        <OneCountry name={countryDetail.name} capital={countryDetail.capital} area={countryDetail.area} languages={countryDetail.languages} flags={countryDetail.flags} />
        )
    }
    return <p>No countries found</p>
}

export default PrintCountries
