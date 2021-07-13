import './styles.css';
export const TextInput = ({ searchValue, handleChange} ) =>{
    return(
        <input onChange={ handleChange }
        className= "text-input"
          value= { searchValue }
          type="search" 
          placeholder = "Type your search"
          >
        </input>
    )
}