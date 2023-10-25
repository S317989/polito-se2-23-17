import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Login from "./Pages/Login.jsx";
import {useState} from "react";
import {UserContext} from "./Contexts.js";


import "./App.css";
import GetTicketPage from "./Pages/GetTicketPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route path="/" element={<p>Home</p>} />
            <Route path="/new-ticket" element={<GetTicketPage />} />
            <Route path="Login" element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
