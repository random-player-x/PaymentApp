import { useState } from 'react'
import './App.css'
import SIGNUP, { SignupPage } from './pages/Signup'
import SIGNIN, { SigninPage } from './pages/Signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import Transaction, { TransferMoney } from './pages/Transfermoney'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SIGNUP />} />
          <Route path="/signin" element={<SIGNIN />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfermoney" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
