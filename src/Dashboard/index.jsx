import React, { useEffect, useState } from "react";
import './index.css'

const Dashboard = () => {
  const [response, setResponse] = useState(null);
  const [name, setName] = useState(null);

  const formatRequestDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    const storedResponse = localStorage.getItem("response");
    const name = localStorage.getItem("name");
    setResponse(JSON.parse(storedResponse));
    setName(name);
  }, []);


  return (
    <div className="content">
      <h2>Welcome, {name}!</h2>
      <h3>Here are your details</h3>
     
        <div>
          <p>Request ID: {response?.data.requestId}</p>
          <p>Request Date: {formatRequestDate(response?.data.requestDate)}</p>
        </div>
      
    </div>
  );
};

export default Dashboard;
