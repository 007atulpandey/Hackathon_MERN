import React , { useEffect , useState, useContext }  from 'react'
import './dashboard.css'
import {useParams} from 'react-router-dom'
import { useHistory} from 'react-router-dom' 

import {UserContext} from '../App';


function EmployeeDetail()
{
     const {hrId , empId} = useParams();
    //  const emp="";
     const {state , dispatch }= useContext( UserContext) ;
     const [emp , setEmp ] = useState({});

     useEffect( ()=>{
      console.log( hrId);
       getData();
       
     },[])
     const getData = async () =>{

        await fetch ('/hr/'+hrId+'/employees/'+empId,{
            method:"get",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
        })
        .then ( data => data.json())
        .then( user => {
            setEmp( user.employee);
              console.log(user);
        })
        .catch( error => console.log(error)) ;

         
     }
      return ( 
       
       <div className = "main">

             <div class="card welcome w-100"  >
               <div class="card-body center w-100">
                 <h3 class="card-title hello center" >User Detail</h3>
               </div>
             </div>
             <div class="container"  >
               <form className = "w-100" >

                            <label > Name : </label> <input   id="name"  name="name" type="text" required="true" value = {emp.name }  /> 
                            <label > Email :</label> <input   id="email"  name="email" type="email" required="true"   value = {emp.email}  /> 
                            <label > Salary : </label> <input type="text" value = { "$"+emp.salary } /> 
                            <label > Team :</label> <input id="text" name="password" type="text"  required="true" value = { emp.team} />
                            <label > createdAt : </label> <input value={emp.createdAt} type="text"   id="confirm" name="repeatpassword"  required="true"/>
                            <label > yearsWorked : </label >  <input type="text"   id="roll" value = { emp.yearsWorked }  required="true"/>
                            <label > Role :</label> <input type="text"   id="salary" value = { emp.role}required="true"/>
                            <label > HR : </label><input type="text"   id="salary" value = { emp.hr}required="true"/>


		        </form>

             </div>
            

      </div > 

     )
    

}


export default EmployeeDetail ;











