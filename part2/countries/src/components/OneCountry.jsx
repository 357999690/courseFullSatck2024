import Languages from "./Languages"

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

  export default OneCountry