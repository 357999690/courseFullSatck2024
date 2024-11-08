// import { filterChange } from "../reducers/filterReducer"
import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"
const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterChange(event.target.value.toUpperCase()))
        // console.log(event.target.value.toUpperCase())
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

export default Filter