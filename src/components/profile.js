
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSchool } from './SchoolContext';
import SchoolStatus from './status';
import { useEffect,useState } from 'react';

const hello = (args) => {

    return <div><h1>Profile of {args}</h1></div>
}

function Profile (){
    const { id } = useParams();
    // const num = Number(id) - 1;
    console.log('here is the id: ' + id);

    const [courses,setCourses] = useState([]);
    const [school, setSchool] = useSchool();
    console.log("Value of school in Profile: ", school);

    ///////////////////////////
    // COURSE FETCH - START //
    ///////////////////////////
   useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://run.mocky.io/v3/34bdbb5f-70c0-41ce-aa0c-2bf46befa477')
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }

    fetchData()
      .then((res) => {
        console.log(res);
        setCourses(res)
        console.log("COURSES ITEMS HERE:");
        console.log(courses);
        
        
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  useEffect(() => {
    console.log("Changed Courses: ", courses)
 }, [courses])

    //\\\\\\\\\\\\\\\\\\\\\\\\\//


    ////////////////////////////////////////
    // CLEANUP DUPLICATES AFTER FETCH //////
    //////////////////////////////


    var result = school.find(item => item.user_id === id);
    console.log(result.id); 
    console.log(result.name);

    var enrolled = [];
    const enroll_raw = [];
    const enroll_unique = [];


    var enrolled = courses.filter(item => item.user_id === id);

        
    for( var i=0, l=enrolled.length; i<l; i++){
        let mergee = `${enrolled[i].semester_code}${enrolled[i].course_selection}`;
        console.log("value of mergee", mergee);
        enroll_raw.push({...enrolled[i],merged:mergee});
        console.log("enroll raw value:", enroll_raw)
    }

    
    for (const item of enroll_raw) {
    const isDuplicate = enroll_unique.find((obj) => obj.merged === item.merged);
    if (!isDuplicate) {
        enroll_unique.push(item);
    }
    }
    console.log("Unique is", enroll_unique);

    


useEffect(() => {
    console.log("enrolled in:",enrolled);
 }, [enrolled])

    const total_fee = () => {
        let total = 0;
        for( var i=0, l=enroll_unique.length; i<l; i++){
            total += Number(enroll_unique[i].course_fee);
        }
        console.log("total course fee", total);
        return total;
    }

    const currencySelected = () => {
        return "US$ ";
    }
    
    
    const imgError = (ev) => {
        ev.target.src = process.env.PUBLIC_URL + '/photos/default.jpg';
      }

    return (
<>


<div className="section-profile">
<Link to="/"><button className='button-home button-footer'>Back Home</button></Link>

<div className="header-content">
    <h1> User ID: {id} </h1>
    {hello(result.name)}
</div>
    
    <div className="profile-holder">

    <div className="profile-photo-container">
    <img className='profile-photo'
            src={process.env.PUBLIC_URL + '/photos/' + result.image}
            onError={imgError}
              />

    </div>
    
              <div className="profile-data">
              <p>Name: <span>{result.name} {result.nickname ? `(${result.nickname})` : null}</span></p>
    <p>Major: <span>{result.major}</span></p>
    <p>Year: <span>{result.year}</span></p>
    <p>Status: <span>{result.status[0]?.type ? SchoolStatus(result.status[0].type) : "Withdrawn"}</span></p>
    <p>Total Course Fee: <span>{currencySelected()}{total_fee()}</span></p>
              </div>

    </div>
    
    
    <table>
        <tr className="profile-courses-header">
            <td>Semester Code</td>
            <td>Course Name</td>
            <td>Course Selection</td>
            <td>Course Fee</td>
            
        </tr>


        
        {enroll_unique.map((raw)=>{
            console.log("value at DOM of enroll_raw", enroll_raw)
            return (
        <tr className="profile-courses-row" key={1+id}>
            <td>{raw.semester_code}</td>
            <td>{raw.course_name}</td>
            <td>{raw.course_selection}</td>
            <td>{currencySelected()}{raw.course_fee}</td>
            
        </tr>
            )
        })}


    </table>

    <Link to="/"><button className='button-home button-footer'>Back Home</button></Link>
</div>
</>

    )

}  


export default Profile