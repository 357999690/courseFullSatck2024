import Person from "./Person";

const Persons = ({ filterName, personDelete }) => {
    return (
        <>
            <ul>
                {filterName.map((person, i) =>
                    <Person key={i} person={person} personDelete={() => personDelete(person.id)}/>
                )}
            </ul>
        </>
    )
}

export default Persons