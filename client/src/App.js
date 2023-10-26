import "bootstrap/dist/css/bootstrap.min.css";

<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Login from "./Pages/Login.jsx";
import { useEffect, useState } from "react";
import { UserContext } from "./Contexts.js";
import AuthenticationAPI from "./APIs/AuhtAPI.jsx";

import "./App.css";
import GetTicketPage from "./Pages/GetTicketPage";
=======
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Services from './Pages/Services';
import Header from './Components/Header';
import './App.css';
>>>>>>> ConfigureCounters-backend

import StatsPage from './Pages/StatsPage';

function App() {
<<<<<<< HEAD
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let _user = new Promise((resolve, reject) => {
      AuthenticationAPI.getSessionAPI()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

    _user
      .then((response) => {
        setUser(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="App">
          <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
              <Header />
              <Routes>
                <Route path="/" element={<p>Home</p>} />
                <Route path="/new-ticket" element={<GetTicketPage />} />
                <Route path="Login" element={<Login />} />
                <Route path="/stats" element={<StatsPage />} />
        </Routes>
            </UserContext.Provider>
          </BrowserRouter>
        </div>
      )}
    </>
=======


  
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/services" element={<Services/>}/>
        </Routes>
      </BrowserRouter>
    </div>
>>>>>>> ConfigureCounters-backend
  );
}

export default App;


