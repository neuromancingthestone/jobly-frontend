import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyAPI";
import JobsCard from "../jobs/JobsCard";
import UserContext from "../UserContext";

// Shows data on a single company. Queries the DB for
// company data by the company id.
// Also lists all available jobs that are associated with the
// company in the DB.
//
// If user has applied to the job, will not show here.


function CompanyDetail() {

  const { currentUser } = useContext(UserContext); // Pull in user data

  const [company, setCompany] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    find(id);
  }, []);
  
  async function find(id) {           
    let company = await JoblyApi.getCompany(id);     
    setCompany(company);
  }

  if(!company) return <p>Not Found</p>;

  return (
    <div className="mainContainer">   
      <div className="card border-info mb-3" style={{width: '30rem'}}>
        <div className="card-header"><h3>{company.name}</h3></div>
        <div className="card-body">
          <p className="card-text">{company.description}</p>
          <p className="card-text">Employees: {company.numEmployees}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-center"><h5>Jobs Available</h5></li>
            {company.jobs && (company.jobs.map(j => (                                       // If company jobs exist, map them all out
              (!currentUser.applications.includes(j.id) &&                                  // as long as they are not in the user's application array
              <li className="list-group-item">                                              
                  <JobsCard 
                    title={j.title}
                    cName={j.companyName}
                    key={j.id}
                    id={j.id}
                    equity={j.equity}
                    salary={j.salary}
                  />
              </li>)          
            )))}            
          </ul>
        </div>
      </div>   
    </div>      
  )
}    

export default CompanyDetail;