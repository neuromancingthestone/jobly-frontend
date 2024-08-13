import React, {useContext} from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

// JobsCard Component
// Populate company data passed from Companies
// component and put on page.

function JobsCard({id, title, cName, equity, salary, applied}) {

  const { submitApply } = useContext(UserContext);

  const navigate = useNavigate();

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  async function apply(e) {    
    submitApply(id);
    navigate("/jobs");
  }

  return (
    <div className="card border-info mb-3" style={{width: '25rem'}}>
      <div className="card-body">
        <h5 className="card-title">{title} - {id}</h5>
        <p className="card-text">{cName}</p>
      </div>
      <div 
        className="card-footer bg-transparent border-info">
          <div>
            Salary: {formatter.format(salary)} - Equity: {equity}
          </div>
      </div>
      {!applied && 
        <a className="btn btn-primary" onClick={apply} type="submit">Apply</a>
      }
    </div>    
  )
}

export default JobsCard;