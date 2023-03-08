import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSchool } from "./SchoolContext";

function Students() {
    const [school, setSchool] = useSchool();
    const [isLoading, setLoading] = useState(true);
    const [studentsData, setStudentsData] = useState([]);
    const [summary, setSummary] = useState([]);
    const [courses, setCourses] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [sort, setSort] = useState(false);
   //Filtered Data Set
   const [data, setData] = useState([]);
   const [searchInput, setSearchInput] = useState("");
   const [fuzzyfiltered, setFuzzyfiltered] = useState([]);
   const [temp, setTemp] = useState([]);

   useEffect(()=>{
    console.log('search input is ', searchInput);
    console.log('temp value is ', temp);
  }, [searchInput, temp]);


// FUZZY EXPERIMENT
useEffect(()=>{

  console.log("search input is:", searchInput);

},[searchInput]);
  
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
        //  console.log(res);
         setCourses(res)
         console.log("Fetch Courses Success, Data is here:", courses);
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
//////////////////////////////////
var courseSummary = courses.reduce((counter,o)=>(
  counter[o.user_id] = (counter[o.user_id] || 0) + 1, counter
),{});

console.log(courseSummary);

const keys = Object.keys(courseSummary);
// console.log(keys);
keys.forEach(key=>{
  // console.log(`${key}: ${courseSummary[key]}`);
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

 useEffect(() => {
  console.log("Changed Summary: ", summary)
}, [summary])

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


///////\\\\\\\\\\\\\\\\\\\\\
////// ITERATION \\\\\\\\\\\\
///// ARRAY OF OBJECTS \\\\\\\ 
//// merging 3 fetched data \\\
/// to be used globally \\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//thanks for dropping by :) \\\\\\

    {
      for(var i = 0, l = studentsData.length; i < l; i++){
        for(var j = 0, ll = profiles.length; j < ll; j++){
          if(`user_${studentsData[i].id}` === profiles[j].user_id){
            if(summary.some(item=>item.user_id === profiles[j].user_id)){

            } else {
              // console.log(`found in ${i} - ${j}`);
              // console.log(courseSummary[profiles[j].user_id]);

              summary.push({image: "user_" + studentsData[i].id + ".jpg", user_id:"user_" + studentsData[i].id,total_course:courseSummary['user_5'],...studentsData[i],...profiles[j]});
              
              // console.log(summary);
              // console.log(profiles[j]?.status[0]?.type);
            }
          } else {
            // console.log(`none found in ${i} - ${j}`);
          }
        }
      }
      console.log(summary);
      setSchool(summary);
      console.log("Set School Value", school);
      // setData(summary);
        // console.log("Set Data Value", summary);
      }

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

const sorted = summary;

// const sortData = (property,order) => {
//   console.log("sorted OG is", sorted);
//   setSort(!sort); //triggers re-render
//   //important note: arr === arr, so no re-render happens below, 
//   console.log("property is", property);
//   console.log("order is", order);
  

//   if (order == 'asc'){
//     console.log("ascending sort ran");
//     setSummary(summary.sort((a, b) => a[property].localeCompare(b[property])));
//   } else {
//     console.log("descending sort ran");
//     setSummary(summary.sort((b, a) => a[property].localeCompare(b[property])));
//   }
//   console.log("sorted data is", data);
// };

//SORT LOGIC
const sortData = event => {
  console.log("sorted OG is", sorted);
  
  const value = event.target.value; 
  console.log("value chosen is", value);
  setSort(!sort); //triggers re-render
  //important note: arr === arr, so no re-render happens below, 

  if (value === 'name-asc'){
    let property = 'name';
    console.log("now running:", value);
    
    setSummary(summary.sort((a, b) => a[property].localeCompare(b[property])));
    if (searchInput.length>0){
      setTemp(temp.sort((a, b) => a[property].localeCompare(b[property])));
    }
  } 
  
  if (value === 'name-desc'){
    let property = 'name';
    console.log("now running:", value);
    
    setSummary(summary.sort((b, a) => a[property].localeCompare(b[property])));
    if (searchInput.length>0){
      setTemp(temp.sort((b, a) => a[property].localeCompare(b[property])));
    }

  }

  if (value === 'major-asc'){
    let property = 'major';
    console.log("now running:", value);
    
    setSummary(summary.sort((a, b) => a[property].localeCompare(b[property])));
    if (searchInput.length>0){
      setTemp(temp.sort((a, b) => a[property].localeCompare(b[property])));
    }
  } 
  
  if (value === 'major-desc'){
    let property = 'major';
    console.log("now running:", value);
    
    setSummary(summary.sort((b, a) => a[property].localeCompare(b[property])));
    if (searchInput.length>0){
      setTemp(temp.sort((b, a) => a[property].localeCompare(b[property])));
    }

  }

  if (value === 'status-asc'){
    let property = 'status';
    console.log("now running:", value);
    
    setSummary(summary.sort((a, b) => a['status'][0].type.localeCompare(b['status'][0].type)));
    if (searchInput.length>0){
      setTemp(temp.sort((a, b) => a[property].localeCompare(b[property])));
    }
  } 
  
  if (value === 'status-desc'){
    let property = 'status';
    console.log("now running:", value);
    
    setSummary(summary.sort((b, a) => a[property].localeCompare(b[property])));
    if (searchInput.length>0){
      setTemp(temp.sort((b, a) => a[property].localeCompare(b[property])));
    }

  }

  console.log("sorted data is", data);
};

//// START: FUZZY SEARCH LOGIC
const mapped = () => {
  setTimeout(()=>{
    console.log('fuzzy search mini time out 0.1s');
  },100);
  if(temp.length>0){
    return temp
  }
  else {
    return summary
  }
};

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);

  const input = searchInput;
  const pattern = `.*${input.split('').join('.*')}.*`;
  const regex = new RegExp(pattern, 'i');
  
  const fuzzy_result = summary.filter(item => regex.test(`${item.name} ${item.email} ${item.phone} ${item.major}`));
  console.log("fuzzy_result is:", fuzzy_result);
  if(e.target.value===""){
    setTemp(summary);
  } else {
    setTemp(fuzzy_result);
  }

  // setFuzzyfiltered(fuzzy_result);
  // setTimeout(()=>{
  //   setTemp(fuzzy_result);
  // },10);

};

//// END: FUZZY SEARCH LOGIC

// OLD CODE REFERENCE: sortie.sort((a, b) => a.id - b.id);


return (
    <>
      <script src="https://kit.fontawesome.com/43dcc20e7a.js" crossorigin="anonymous"></script>
<div className="setting-container">
<div className="setting-left">
      <div className="search-container">

      <div class="search-box">
        <input 
        type="text" 
        className="search-input" 
        placeholder="Search.."
        onChange = {handleChange}
        value = {searchInput}
        />
        <button className="search-button">
        🔍
        </button>
      </div>

      </div>
      
    </div>

    <div className="setting-right">
    <select className="minimal" onChange={sortData}>
        <option value="default">Click to Sort</option>
        <option value="name-asc" >Sort by Name (Ascending)</option>
        <option value="name-desc">Sort by Name (Descending)</option>
        <option value="major-asc" >Sort by Major (Ascending)</option>
        <option value="major-desc">Sort by Major (Descending)</option>
        <option value="status-asc" >Sort by Status (Ascending)</option>
        <option value="status-desc">Sort by Status (Descending)</option>
    </select>

    </div>
</div>

{/* 
    <button className="button-sort" onClick={() => sortData('name','asc')}>Sort by Name (Ascending) </button>
    <button className="button-sort" onClick={() => sortData('name','desc')}>Sort by Name (Descending)</button>
    <button className="button-sort" onClick={() => sortData('major','asc')}>Sort by Major (Ascending) </button>
    <button className="button-sort" onClick={() => sortData('major','desc')}>Sort by Major (Descending)</button> */}

    {console.log("data at render:", data)}

    <table>
<tr>
<th>Photo </th>

<th>Name</th>
<th>Phone</th>
<th>Email</th>
<th>Major</th>
<th>Status</th>
<th>Total Course</th>
</tr>


    {

      
      mapped().map((student)=>{
        return (
          <tr className="student-row" key={student.id}>
            <td className="column-image">
                <img 
            src={process.env.PUBLIC_URL + '/photos/' + student.image}
            onError={imgError}
              />


            </td>
            
            <td><Link to={`/${student.user_id}`}>{student.name} {student.nickname ? `(${student.nickname})` : null} </Link> </td>
            <td>{student.phone}</td>
            <td>{student.email}</td>
            <td>{student.major}</td>
            <td>{student.status[0]?.type ? statusCheck(student.status[0].type) : "Withdrawn"}</td>
            <td>{student.total_course}</td>
          </tr>
        )
      })
    }
    </table>
    </>
    
)

}

export default Students;