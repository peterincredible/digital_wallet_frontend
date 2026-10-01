import { useState } from 'react'
import {Routes, Route } from "react-router";
import Dashboard from './pages/Dashboard';
import TransactionHistory from  './pages/TransactionHistory';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AddFunds from "./pages/AddFunds"
import TransactionDetail from "./pages/TransactionDetail"
import SendFunds from './pages/SendFunds';

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path='/transaction-history' element={<TransactionHistory />} />
        <Route path='/add-funds' element={<AddFunds />} />
        <Route path='/send-funds' element={<SendFunds />} />
        <Route path="/transaction-detail/:id" element={<TransactionDetail />} />
      </Routes>
      
    </>
  )
}

export default App
