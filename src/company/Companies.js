import React from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../api/JoblyAPI";
import { useState, useEffect } from "react";
import LoadingMessage from "../Loading";
import Search from "../forms/Search";
import { Alert } from "reactstrap";

// Call API for a list of all the available companies
// and show them on the page.
// Uses <CompanyCard> component to populate company data

function Companies() {

  const [companies, setCompanies] = useState(null);
  const [resp, setResp] = useState(false);  

  useEffect(() => {
    find();
  }, []);

  async function find(title) {
    try {
      if(title === "")  title = undefined;

      let res = await JoblyApi.getCompanies(title);

      setCompanies(res);                                    // Update company state to show companies found
      if(res.length === 0) {
        setResp(true);
        return;        
      }
      setResp(false);

    } catch(e) {
      console.error(e);
    } 
  }

  if(!companies) return <LoadingMessage />;                  // Show loading component if companies have not loaded yet

  return (
    <div className="mainContainer">
      <div>
        <Search caller="Companies" searchTerm={find} />  
        {
          resp && 
            <Alert color="warning">
              No companies match that search term!
            </Alert>
        }     
        <h1>Company List</h1>        
        {companies.length ? (companies.map(c => (           // If any companies exist, map out each one
          <CompanyCard 
            name={c.name}
            desc={c.description}
            key={c.handle}
            handle={c.handle}
            logo={c.logoUrl}
            emp={c.numEmployees}
          />
        ))) : <p></p>}
      </div>
    </div>
  )
}

export default Companies;