import axios from "axios"
import { useEffect, useState,  } from "react"

const MoreTen = () => {
  return (
    <p>Too many matches, specify another filter</p>
  )
}

const TenByOne = ( {countriesByOne, handleCountryClick} ) => {
  return (
    <div>
      <li>{countriesByOne}</li>
      <button onClick={handleCountryClick}>show</button>
    </div>
  )
}

const TenToOne = ( {countries, handleCountryClick} ) => {
  return (
    <>
      <ul>
        {countries.map((c,i) =>
          <TenByOne key={i} countriesByOne={c.name.common} handleCountryClick={() => handleCountryClick(c.name.common)}/>)
          }
      </ul>
    </>
  )
}

const Languages = ( {languages} ) => {
  return (
    <div>
      <li>{languages}</li>
    </div>
  )
}

const OneCountry = ( {country} ) => {
  const languages = Object.values(country.languages)
  const img = country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>lenguages:</h2>
      <ul>
        {languages.map((l,i) => 
          <Languages key={i} languages={l}/>)}
      </ul>
      <img src={img}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
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
    // return (
    //   <MoreTen/>
    // )
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
        {/* {filter.length > 10 ?
          <MoreTen/> :
          null} */}
      </div>
        
        
      
      
    </>
  )
}
export default App
