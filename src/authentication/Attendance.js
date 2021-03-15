import React, { useEffect, useState , useContext} from 'react';
//import './Attendance.css'
import {UserContext} from '../App';
import M from 'materialize-css'
function Attendance(props) {

    const {state , dispatch } = useContext(UserContext) ;
const name= JSON.parse(localStorage.getItem('user'));
   const mark = (e)=>{
             console.log(name._id)
             //console.log(e.target.value)
        fetch ("/employee/"+name._id+"/mark-attendance" , {
          method : "post" ,
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        })
        .then( data => data.json())
        .then( data =>{
          
          if( data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
            M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
          }
        }
         
        )
        
      }

const today=new Date();
  return (
<div class="card d-flex justify-content-center text-center w-70">
     <div className="card-body mx-auto">
     <div className="card-text mx-auto">{today.toLocaleString()}</div>
     <button  onClick = { mark }  name="mark" value= { name._id} className="green darken-1">Mark-attendance</button>
     </div>
    </div>
  )
}
export default Attendance;
