
import './App.css';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import Students from './components/students';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/profile';
// import { useSchool } from './components/SchoolContext';
// import { SchoolProvider } from './components/SchoolContext';

function App() {

  const [hello, setHello] = useState('itme');
  // const {school, setSchool} = useSchool();
  // setSchool("schooolbus");

  return (
    <>
    
      <div className="App">
      <Routes>
        <Route exact path='/' element={< Home />} state={hello}></Route>
        <Route exact path='/profile' element={< Profile />}></Route>
        <Route path="/:id" element={<Profile />} />
      </Routes>
  </div>
  
    </>
  )
}

export default App;
