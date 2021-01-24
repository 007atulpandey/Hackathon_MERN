import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import { Link , useHistory }  from 'react-router-dom'


const Search = () =>{
    
    const { state , dispatch } = useContext ( UserContext) ;
    const [ flag , setFlag ] = useState (false) ;
    const [ role , setRole ] = useState ("") ;
    const [ year , setYear ] = useState ("") ;
    const [ team , setTeam ] = useState ("") ;
    const [ searched , setData ] = useState ([]) ;
    useEffect(() =>{
        getData ();

    })

    const getData = async () =>{
    }
    const submit = () =>{
       var data = {};
        if( role !== ''){
           data.role  = role ;
        }

        if( year !== ""){
            data.yearsWorked =year ;
        }
        if( team != "")
        data.team = team ;

        fetch( "/hr/"+state._id+"/search",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                data 

            })
        })
        .then( res =>res.json())
        .then ( data =>{
            console.log( data.employees) ;
            setData( data.employees);
            if( searched.length > 0 ){
                setFlag( true );
            }
            else 
            setFlag(false ) 
        })


    }

    
    return (
        <div >
        <h2 > Search Here : </h2 > 
        Role : 
        <input  type = "text" onChange = { ( e ) => { setRole( e.target.value)}} />
        Team : 
        <input  type = "text" onChange = { ( e ) => { setTeam( e.target.value)}} />
        YearOfExperience : 
        <input  type = "text" onChange = { ( e ) => { setYear( e.target.value)}} />

        <button onClick = { submit }>
            search  
            </button >        
         
        <div id = "main_body"> 
        {
            flag ? searched.map ( ( contest ) =>{
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
              }) :<></>
        }
       </div>  
        </div >
    )
}

export default Search ;