import "./App.css";
import Home from "./Components/Home.js";
import React, { useState } from "react";
import Dashboard from "./Components/Dashboard.js";
const App = () => {
  const [islogged, setIslogged] = useState(false);
  const [id, setId] = useState();
  const [person, setPerson] = useState({
    username: "samarth.asthana",
    email: "samarthasthana110@gmail.com",
    mobileNo: "+91-7651842669",
    bucket: [],
    query:[]
  });
  return (
    <div className=".app" style={{overflow: "hidden"}}>
      {islogged ? (
        <Dashboard
          setIslogged={setIslogged}
          id={id}
          setPerson={setPerson}
          person={person}
        />
      ) : (
        <Home
          setIslogged={setIslogged}
          setId={setId}
          person={person}
          setPerson={setPerson}
          islogged={islogged}
        />
      )}
    </div>
  );
};

export default App;
