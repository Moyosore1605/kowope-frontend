import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SelectRole from './pages/SelectRole';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/select-role' element={<SelectRole />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
