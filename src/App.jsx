import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [job, setjob] = useState([]);
  const [Search, setsearch] = useState('');
  const [cityfilter, setcityfilter] = useState('All jobs');

  useEffect(() => {
    axios.get('http://localhost:3005/jobData')
      .then(res => setjob(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredjobs = job.filter(j => {
    const matchjob = j.job_title.toLowerCase().includes(Search.toLowerCase());
    const matchcity = cityfilter === 'All jobs' || j.job_city === cityfilter;
    return matchcity && matchjob;
  });

  function reset() {
    setsearch('');
    setcityfilter('All jobs');
  }

  return (
    <div className="job">
      <h1>Job Finder</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search job title"
          value={Search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <select
          value={cityfilter}
          onChange={(e) => setcityfilter(e.target.value)}
        >
          <option value="All jobs">All jobs</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Banglore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Remote">Remote</option>
        </select>

        <button onClick={reset}>Reset</button>
      </div>

      <div className="main">
        {filteredjobs.length > 0 ? (
          filteredjobs.map((m, index) => (
            <div className="job-card" key={index}>
              <p className="job-title">{m.job_title}</p>
              <p className="company">{m.employer_name} : {m.job_city}</p>
              <a href="#" className="apply-link">Apply here</a>
            </div>
          ))
        ) : (
          <p>No matching jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
