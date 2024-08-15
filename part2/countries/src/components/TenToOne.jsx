import TenByOne from "./TenByOne"

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

  export default TenToOne