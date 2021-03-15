import React, { useEffect, useState , useContext} from 'react';
//import './Attendance.css'
import {UserContext} from '../App';
import M from 'materialize-css'

function OpenAttendance(props) {
      const [att,setAtt]=useState([]);
      const {state , dispatch } = useContext(UserContext) ;
      const [istrue,setIstrue]=useState(false);
 
      const name= JSON.parse(localStorage.getItem('user'));
      const mark = (e)=>{
             
             //console.log(e.target.value)
        fetch ("/hr/"+name._id+"/open-attendance" , {
          method : "post" ,
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        })
        .then( data => data.json())
        .then( data =>{
          console.log(data)
          if( data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
            M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
          }
        }
         
        )
  }

 const check=(e)=>{
            const day=document.getElementById('day').value;
            const month=document.getElementById('month').value;
            const year=document.getElementById('year').value;
            // console.log(day)
        fetch ("/hr/"+name._id+"/get-specific-attendance/"+day+"/"+month+"/"+year , {
          method : "get" ,
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then( data => data.json())
        .then( data =>{
          //console.log(data)
            setAtt(data);
            setIstrue(true);
            
           console.log(istrue)
           console.log(att.attendance);
          if( data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
            
            M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
          }
        }
        )
      }
 
   useEffect(()=>{
if(istrue&&att.attendance!==undefined)
{console.log(att.attendance);
}else{
  console.log("no");
}
   },[Greeting])
   useEffect(()=>{
  console.log("istrue beig true")
   },[istrue])
const today=new Date();
function Greeting() {
   if(att!==undefined)
       {
       if(att.attendance!==undefined)
                          return( 
                           <tbody>
                            {
                            att.attendance.map((e)=>{
                                                          return(
                                                           <tr>
                                                           <td>{e.empName}</td>
                                                           <td>{e.hour}</td>
                                                           <td>{e.min}</td>
                                                           <td>{e.present}</td>
                                                           </tr>
                                                             );
                                                      }
                                                  )
                       
                          }
                          </tbody>);

      }
      return <tbody>nothing to show..</tbody>
    }
 
  return (
<div class="card d-flex justify-content-center text-center w-70">
     <div className="card-body mx-auto">
     <div className="card-text mx-auto">{today.toLocaleString()}</div>
     <button  onClick = { mark }  name="mark" value= { name._id} className="green darken-1">Open Attendance</button>
     <input type="text" placeholder="day" id="day"/>
     <input type="text" placeholder="month" id="month"/>
     <input type="text" placeholder="year" id="year"/>
     <button  onClick = { check }  name="check"  className="green darken-1">Attendance</button>
     </div>
         <div class="card">
          <table>
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>hour</th>
                            <th>minute</th>
                            <th>present/absent</th>
                        </tr>
                      </thead>
                      
                           <Greeting/>            
                      
              </table>

          </div>
       </div>
  )
}
export default OpenAttendance;
