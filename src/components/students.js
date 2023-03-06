import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import photo from '../../public/photos/user_5.jpg';

function Students() {
    const [isLoading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    
    const [studentsData, setStudentsData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [allData, setAllData]=useState([]);
    const [transmute, setTransmute]=useState([]);
    const [summary, setSummary] = useState([]);
   const [courses, setCourses] = useState([])
   const [profiles, setProfiles] = useState([])

  //  COURSES - ASYNC FETCH and SAVE IN USESTATE, THEN CONSOLE LOG CHANGES
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

////////////////////////////////////
/// RETURNS THE SUMMARY OF EACH ///
///////////
var courseSummary = courses.reduce((counter,o)=>(
  counter[o.user_id] = (counter[o.user_id] || 0) + 1, counter
),{});

console.log(courseSummary);
console.log(courseSummary);

const keys = Object.keys(courseSummary);
console.log(keys);
keys.forEach(key=>{
  console.log(`${key}: ${courseSummary[key]}`);
})

  //  Student Profiles - ASYNC FETCH and SAVE IN USESTATE, THEN CONSOLE LOG CHANGES

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://run.mocky.io/v3/214aef9d-b18a-4188-b55f-a25046408a7e')
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }

    fetchData()
      .then((res) => {
        console.log(res);
        setProfiles(res)
        console.log("Profiles ITEMS HERE:");
        console.log(profiles);
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  useEffect(() => {
    console.log("Changed Profiles: ", profiles)
 }, [profiles])

   //  All Student - ASYNC FETCH and SAVE IN USESTATE, THEN CONSOLE LOG CHANGES

    useEffect(() => {
        axios
        .get("https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad")
        .then(response => {
          const data1 = response.data;
          setStudentsData(data1);
          setLoading(false);
        })
        .catch(error => console.log(error));
      }, []);

      useEffect(() => {
        console.log("Changed studentsData: ", studentsData)
     }, [studentsData])

    if (isLoading) {
        return <div className="App">Loading...</div>;
      }

      const imgError = (ev) => {
        ev.target.src = process.env.PUBLIC_URL + '/photos/default.jpg';
      }
    // console.log(`value of data 2 is: ${data2}`);



    // useEffect(()=>,[])

    

      // useEffect(()=>{

      // },[])

      
    //   useEffect(() => {
    //     console.log("Changed summary: ", summary)
    //  }, [summary])


///////////////
////// ITERATION RUN: NEW ARRAY OF OBJECTS MERGING THREE FETCHED DATA TO CREATE ALL STUDENT PROFILES PAGE /////
///////////////

    {
      for(var i = 0, l = studentsData.length; i < l; i++){
        for(var j = 0, ll = profiles.length; j < ll; j++){
          if(`user_${studentsData[i].id}` === profiles[j].user_id){
            if(summary.some(item=>item.user_id === profiles[j].user_id)){

            } else {
              console.log(`found in ${i} - ${j}`);
              console.log(courseSummary[profiles[j].user_id]);

              summary.push({image: "user_" + studentsData[i].id + ".jpg", user_id:"user_" + studentsData[i].id,total_course:courseSummary['user_5'],...studentsData[i],...profiles[j]});
              console.log(summary);
              console.log(profiles[j]?.status[0]?.type);
            }
          } else {
            // console.log(`none found in ${i} - ${j}`);
          }
        }
      }
      }

//       var array =
//     [
//         {"name":"abc","age":20},
//         {"name":"abc","age":20},
//         {"name":"abc","age":20},
//         {"name":"xyz","age":21},
//         {"name":"xyz","age":21}
//     ];
    
// var result = array.reduce( (acc, o) => (
//   acc[o.name] = (acc[o.name] || 0)+1, acc
//   ), {} );

// console.log(result);

//STATUS VALUES CHECK//
const statusCheck = (type) => {
  switch (type) {
    case 1: 
    return "Good";
    break;
    case 2: 
    return "Probation";
    break;
    case 3: 
    return "Inactive";
    break;
  }
}

console.log("Status Check:", statusCheck(2));

return (
    <>
{/* {
      studentsData.forEach((student)=>{
        if(allData.some(item => item.id === student.id)){
        } else {
        allData.push({image: "user_" + student.id + ".jpg", user_id:"user_" + student.id,...student});
        }
        
        })
    } */}


    {summary.map((student)=>{
        return (
          <tr className="student-row" key={student.id}>
            <td className="column-image">
                <img 
            src={process.env.PUBLIC_URL + '/photos/' + student.image}
            onError={imgError}
              />

              {/* onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src={process.env.PUBLIC_URL + '/photos/user_1.jpg'};
              }} */}
            </td>
            <td>{student.id}</td>
            <td><Link to={`/${student.id}`}>{student.name} {student.nickname ? `(${student.nickname})` : null} </Link> </td>
            <td>{student.phone}</td>
            <td>{student.email}</td>
            <td>{student.major}</td>
            <td>{student.status[0]?.type ? statusCheck(student.status[0].type) : "Withdrawn"}</td>
            <td>{student.total_course}</td>
          </tr>
        )
      })
    }
    </>
    
)

}

export default Students;