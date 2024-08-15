const Filter = ({ findName, handleNameChange }) => {
return (
    <div>
        filter shown with <input
            value={findName}
            onChange={handleNameChange}/>
    </div>
)
}

export default Filter