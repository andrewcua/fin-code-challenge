
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSchool } from './SchoolContext';
import SchoolStatus from './status';
import { useEffect,useState } from 'react';

const hello = (args) => {

    return <div><p className='profile-header'>Profile of {args}</p></div>
}

function Profile (){
    const { id } = useParams();

    // const num = Number(id) - 1;
    console.log('here is the id: ' + id);

    const [courses,setCourses] = useState([]);
    const [school, setSchool] = useSchool();
    const [currency, setCurrency] = useState('USD');
    const [rate, setRate] = useState([]);
    const [reload, setReload] = useState(true);
    const [multiple, setMultiple] = useState('1');
    console.log("Value of school in Profile: ", school);

    /////////////////////////////
    // CURRENCY FETCH - START //
    ///////////////////////////
   useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://v6.exchangerate-api.com/v6/3afebd846bb3b3774087066e/latest/USD')
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }

    fetchData()
      .then((res) => {
        console.log(res.conversion_rates);
        setRate(res.conversion_rates);
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  useEffect(() => {
    console.log("RATE LIST:", rate);
    console.log("CNY RATE:", rate['CNY']);
 }, [rate])

 useEffect(() => {
    console.log("Current selected currency:", currency);

    console.log("Multiple Updated (Multiplier to Base Rate):", multiple);
 }, [multiple])

    //\\\\\\\\\\\\\\\\\\\\\\\\\//
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
        // console.log(res);
        setCourses(res)
        // console.log("COURSES ITEMS HERE:");
        // console.log(courses);
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
        // console.log("value of mergee", mergee);
        enroll_raw.push({...enrolled[i],merged:mergee});
        // console.log("enroll raw value:", enroll_raw)
    }

    for (const item of enroll_raw) {
    const isDuplicate = enroll_unique.find((obj) => obj.merged === item.merged);
    if (!isDuplicate) {
        enroll_unique.push(item);
    }
    }
    // console.log("Unique is", enroll_unique);

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
        return "USD";
    }
    
    
    const imgError = (ev) => {
        ev.target.src = process.env.PUBLIC_URL + '/photos/default.jpg';
      }

      const changeCurrency = event => {
        const selectedCurrency = event.target.value; 
        console.log("now changing currency to:", selectedCurrency);
        console.log("invoking rate of selected currency:", rate[selectedCurrency]);
        setCurrency(selectedCurrency);
        setMultiple(rate[selectedCurrency]);
      }

      const rateMultiplier = (currency) => {
            // setReload(!reload);
            console.log('rate multiplier:', rate[currency]);
            return rate[currency]
      }

    //   const currencyList = () => {
    //     return Object.getOwnPropertyNames(rate);
    //   }

    //convert final viewable number to a string with comma and two zeroes
    const formattedNumber = (item) => item.toLocaleString("en-US");

    const usernotice = () => {
        setTimeout(()=>{
          console.log('usernotice time out 0.1s');
        },100);
      
        if(enroll_unique.length<1){
            return (
                <p>No data found.</p>
              )
  
        }
      };


    return (
<>


<div className="section-profile">
    <div className="profile-header-container">
    <Link to="/"><button className='button-home button-footer'>Back Home</button></Link>

<div className="profile-setting-right">
    <select className="minimal" onChange={changeCurrency}>
        {Object.getOwnPropertyNames(rate).map((item)=>{
            return (
            <option value={item}>Currency: {item} </option>
            )
        })}
        
        <option value="CNY">Currency: CNY (CN Yen)</option>

    </select>

</div>

    </div>



<div className="header-content">
    
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
              <p> User ID: <span>{id}</span></p>
              <p>Name: <span>{result.name} {result.nickname ? `(${result.nickname})` : null}</span></p>
    <p>Major: <span>{result.major}</span></p>
    <p>Year: <span>{result.year}</span></p>
    <p>Status: <span>{result.status[0]?.type ? SchoolStatus(result.status[0].type) : "Withdrawn"}</span></p>
    <p>Total Course Fee: <span>{currency} {formattedNumber(multiple*Number(total_fee()))}</span></p>
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
            // console.log("value at DOM of enroll_raw", enroll_raw)
            return (
        <tr className="profile-courses-row" key={1000+id}>
            <td>{raw.semester_code}</td>
            <td>{raw.course_name}</td>
            <td>{raw.course_selection}</td>
            <td>{currency} {formattedNumber(multiple*Number(raw.course_fee))}</td>
            {/* {rateMultiplier()*Number(raw.course_fee)} */}
        </tr>
            )
        })}


    </table>
    {usernotice()}

    <Link to="/"><button className='button-home button-footer'>Back Home</button></Link>
</div>
</>

    )

}  


export default Profile