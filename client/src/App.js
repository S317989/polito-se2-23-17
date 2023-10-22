import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Header from './Components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
