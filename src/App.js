
import './App.css';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import Students from './components/students';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/profile';
function App() {
  // const [isLoading, setLoading] = useState(true);
  // const [studentsData, setStudentsData] = useState([]);

  // useEffect(() => {
  //   axios
  //   .get("https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad")
  //   .then(response => {
  //     setStudentsData(response.data);
  //     setLoading(false);
  //   })
  //   .catch(error => console.log(error));
  // }, []);

  // const getStudentsData = () => {
  //   axios
  //   .get("https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad")
  //   .then(response => setStudentsData(response.data))
  //   .catch(error => console.log(error));
  //   };

  //  getStudentsData();

  //  console.log(studentsData);

  // if (isLoading) {
  //   return <div className="App">Loading...</div>;
  // }

  // studentsData.map((student)=>{
  //   console.log(student);
  //   return (
  //     <div className="student-row" key={student.id}>
  //       <h1>{student.name}</h1>
  //     </div>
  //   )
  // })

  return (
    <>
      <div className="App">
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/profile' element={< Profile />}></Route>
        <Route path="/:id" element={<Profile />} />
      </Routes>
  </div>

    </>
  )
}

export default App;
