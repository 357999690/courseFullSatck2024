const TenByOne = ( {countriesByOne, handleCountryClick} ) => {
    return (
      <div>
        <li>{countriesByOne}</li>
        <button onClick={handleCountryClick}>show</button>
      </div>
    )
  }

  export default TenByOne