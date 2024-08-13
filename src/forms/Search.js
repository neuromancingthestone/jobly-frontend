import React, {useState} from "react";

// Search component
// Used in both Companies and Jobs components
// Allows a search term to be passed to a parent
// When term is passed to parent, the parent uses
// the term to filter its data.

const Search = ({caller, searchTerm}) => {

  const initialState = {
    searchTerm: "",    
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData(data => ({
      ...data,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    searchTerm(formData.searchTerm)
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col">
        { 
          <input 
            className="form-control" 
            id="searchTerm"
            type="text" 
            placeholder={`Search ${caller}`}
            value={formData.searchTerm}
            onChange={handleChange}
          />
        }
      </div>
      <div className="col-sm-2">
        <button type="submit" className="btn btn-primary mb-2">Search</button>  
      </div>    
    </form>     
  )
}

export default Search;