
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useParams } from "react-router-dom";


function Profile (){
    const { id } = useParams();
    console.log('here is the id: ' + id);


    return (




<div className="section-table">
    <h1> {id} </h1>
<table>
<tr>
<th>Photo</th>
<th>ID</th>
<th>Name</th>
<th>Phone</th>
<th>Email</th>
<th>Major</th>
<th>Status</th>
<th>Total Course</th>
</tr>
</table>
</div>

    )

}  


export default Profile