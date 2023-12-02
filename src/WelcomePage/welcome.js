import React from "react";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate();

  return <div className="welcomeContainer">
    <h1 className="welcomeMsg">Team Transactions Titans welcomes you to  the Hackfest</h1>
    <button onClick={() => navigate('/10585943')} className="getStarted">Get Started</button>
  </div>

}
export default Welcome;
