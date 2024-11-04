
import { useEffect, useState,  } from "react"
import TenToOne from "./components/TenToOne"
import MoreTen from "./components/MoreTen"
import OneCountry from "./components/OneCountry"
import countriesServices from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  useEffect(() => {
    countriesServices
      .getAll()
      .then(countries => {
        
        setCountries(countries)
      })
  }, [])

  const handleCountryChange = (event) => {
    setSearchCountries(event.target.value)
  }

  const handleCountryClick = countryName => {
    setSearchCountries(countryName)
  }

  const filter = countries.filter(country => country.name.common.toUpperCase().startsWith(searchCountries.toUpperCase()))
  const renderCountries = () => {
    if(!searchCountries) {
      return null
    }
    if(filter.length <10 && filter.length > 1) {
      return (
        <TenToOne countries={filter} handleCountryClick={handleCountryClick}/>
      )
    }
    if(filter.length > 10) {
      return (
        <MoreTen/>
      )
    }
    if(filter.length === 1) {
      return (
        <OneCountry country={filter[0]}/>
      )
      
    }
  }

  return (
    <>
      <div>
        find countries<input
          value={searchCountries}
          onChange={handleCountryChange}/>
      </div>
      <div>
        {renderCountries()}
      </div>
    </>
  )
}
export default App
