import React from "react";
import { Link } from "react-router-dom";

// Populate company data passed from Companies
// component and put on page.

function CompanyCard({name, desc, emp, handle}) {
  return (
    <div className="card border-info mb-3" style={{width: '30rem'}}>
      <div className="card-body">
        <h5 className="card-title"><Link to={`/companies/${handle}`}>{name}</Link></h5>
        <p className="card-text">{desc}</p>
      </div>
      <div className="card-footer bg-transparent border-info">Employees: {emp}</div>
    </div>
  )
}

export default CompanyCard;