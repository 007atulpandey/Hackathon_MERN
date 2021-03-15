import React , { useState , useEffect, useContext}from 'react'
import './list.css'
import M from 'materialize-css'
import {Link , useHistory } from 'react-router-dom'
import { UserContext}  from  '../App'

function  ListCandidates(props){
      const { state , dispatch } = useContext( UserContext) ;
    const [data , setData ] = useState([]);
      const [ flag , setFlag] = useState ( false ) ;
    useEffect (()=>{
        getData();
     },[]);
      const getData = async () =>{

       await fetch(`https://server0826.herokuapp.com/hr/`+state._id+`/employees`,{
          method:"get",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
      }).then(res=>res.json())
      .then(data=>{
          console.log(data)
         if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
       
            console.log(data) ;
            setData(data.employees);

            if( data.employees.length > 0) 
            setFlag( true ) 
            else 
            setFlag( false )

         }
      }).catch(err=>{
          console.log(err)
      });

        

      };
     
      return (
        <div class= " container list-candidate " > 
            { 
              
             flag ?
              data.map ( ( contest ) =>{
                return (<div class="card ">
                  <div class="card-body">
                    <h5 class="card-title"> { contest._id}</h5>
                    <p class="card-text">Name : { contest.name}</p>
                    <p class="card-text">Role :{ contest.role}</p>
                    <p class="card-text">Salary : ${ contest.salary}</p>
                    <p class="card-text"> Team : { contest.team}</p>
                    <p class="card-text"> email : { contest.email}</p>
                    <Link  to = {"/hr/"+state._id+"/employees/"+contest._id }> < div class="btn btn-success" > Get Detail </div> </Link>
                  </div>
                </div>)
              })
              :<></>
            }            
        </div> 

      );
    


}


export default ListCandidates ;
