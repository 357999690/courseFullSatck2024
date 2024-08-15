const Person = ({ person, personDelete }) => {
    return (
        <div>
            <li>{person.name} {person.number}</li>
            <button onClick={personDelete}>delete</button>
        </div>
    )
}

export default Person