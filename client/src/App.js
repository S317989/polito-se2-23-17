import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Login from "./Pages/Login.jsx";
import { useEffect, useState } from "react";
import { UserContext } from "./Contexts.js";
import AuthenticationAPI from "./APIs/AuhtAPI.jsx";

import "./App.css";
import GetTicketPage from "./Pages/GetTicketPage";
import Services from "./Pages/Services";
import StatsPage from './Pages/StatsPage';

function App() {
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

    Promise.all([_user])
      .then(async (responses) => {
        if (responses[0].status === 200)
            setUser(await responses[0].json());
        else setUser(null);

        setIsLoading(false);
      })
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
                <Route path="/services" element={<Services />} />
        </Routes>
            </UserContext.Provider>
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;


