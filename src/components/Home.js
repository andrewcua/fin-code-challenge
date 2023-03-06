
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Students from './students';

function Home (){


    return (




<div className="section-table">
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
<Students/>
</table>
</div>

    )

}  


export default Home