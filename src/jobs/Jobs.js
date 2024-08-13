import React from "react";
import JobsCard from "./JobsCard";
import JoblyApi from "../api/JoblyAPI";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import Search from "../forms/Search";
import { Alert } from "reactstrap";
import LoadingMessage from "../Loading";

// Jobs Component
// Call API for a list of all the available jobs
// and show them on the page.
// Uses <JobsCard> component to populate job data
// Splits into two separate areas
// Applied Jobs - user has applied to job
// Open Jobs - user has not applied to job

function Jobs() {

  const { currentUser } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  const [resp, setResp] = useState(false);  

  useEffect(() => {
    find();
  }, [currentUser.applications]);                     // Call on page load or if the user
                                                      // applies to a job, so it will load to new list
  async function find(title) {
    try {
      if(title === "")  title = undefined;

      let jobs = await JoblyApi.getJobs(title);
      setJobs(jobs);
      if(jobs.length === 0) {
        setResp(true);
        return;        
      }
      setResp(false);

    } catch(e) {
      console.debug(e);
    }
  }

  if(!jobs) return <LoadingMessage />;

  return (
    <div className="mainContainer">
      <div>
        <Search caller="Jobs" searchTerm={find} />  
        {
          resp && 
            <Alert color="warning">
              No jobs match that serach term!
            </Alert>
        }                
        <h1>Applied Jobs</h1>        
        {currentUser.applications.length ? (jobs.map(j => (                     // If there are jobs that have been applied to
          currentUser.applications.includes(j.id) ?                             // List them here
            <JobsCard 
              title={j.title}
              applied={true}
              cName={j.companyName}
              key={j.id}
              id={j.id}
              equity={j.equity}
              salary={j.salary}
            />
          : ""
        ))) : <p className="text-white">You have not applied for any job!</p>}
        <h1>Open Jobs</h1>        
        {jobs.length ? (jobs.map(j => (                                         // Show open jobs here
          !currentUser.applications.includes(j.id) ?
            <JobsCard 
              title={j.title}
              applied={false}
              cName={j.companyName}
              key={j.id}
              id={j.id}
              equity={j.equity}
              salary={j.salary}
            />
          : ""
        ))) : <p className="text-white">Empty</p>}
      </div>         
    </div>
  )
}

export default Jobs;