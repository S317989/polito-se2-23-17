import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './Components/login';
import CallNextCustomer from './Components/callNextCustomer';
import { useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Header from './Components/Header';
import './App.css';

function App() {

  const [counters, setCounters] = useState([1,2,3,4]);
  const [customer, setCustomer] = useState(Array(counters.length).fill(0));

function updateCustomers(counterNumber){
  setCustomer((old)=>{
    const copyOldarray = [...old]
    let max = copyOldarray.reduce((max, current) => (current > max ? current : max), copyOldarray[0]);
    copyOldarray[counterNumber] = max+1
    return copyOldarray;
  });
}



  return (
   <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/nextCustomer" element={<CallNextCustomer counters = {counters} number={customer} updateCustomers = {updateCustomers} />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
