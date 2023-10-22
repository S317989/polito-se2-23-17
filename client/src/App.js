import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Header from './Components/Header';
import './App.css';
import GetTicketPage from './Pages/GetTicketPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/new-ticket" element={<GetTicketPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
