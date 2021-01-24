import React , { useState , useEffect, useContext}from 'react'
import './list.css'
import {UserContext} from '../App';
import M from 'materialize-css'
function  Leaves(props){
      
    const [data , setData ] = useState([]);
    const {state , dispatch } = useContext( UserContext) ;

    useEffect (()=>{
        getData();
     },[]);
      const getData = async () =>{
      
        // console.log(finalData) ;
        const data = await fetch ("/hr/"+state._id+"/leave-reqs");
        const final = await data.json();
        //console.log( final) ;
        setData( final.leaves);

      };
      // /    hr/:hrId/leave-reqs/:leaveId/:status   : post
      const accept = (e)=>{
             
        fetch ("/hr/"+state._id+"/leave-reqs/"+e.target.value+"/1" , {
          method : "post" ,
          headers:{
            "Content-Type":"application/json"
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
      const reject = (e)=>{
             
        fetch ("/hr/"+state._id+"/leave-reqs/"+e.target.value+"/0" , {
          method : "post" ,
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then( data => data.json())
        .then( data =>{
          if( data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
            M.toast({html:"Rejected",classes:"#43a047 red darken-1"})
          }
        }
         
        )
          

      }

     
      return (
        <div class= " container list-candidate " > 
            { 
              data.map ( ( contest ) =>{
                return (<div class="card ">
                  <div class="card-body">
                    <h5 class="card-title">{contest.employee.name}</h5>
                    <p class="card-text"> Email : {contest.employee.email}</p>
                    <p className="card-text">Reason: { contest.reason}</p>
                    <p class="card-text">Application Date : <input type="text" value={ contest.currDate} readonly/></p>
                    <div className="d-flex justify-content-around ">
                    <p class="card-text">start date : <input type="text" value={ contest.startDate} readonly/></p>
                    <p class="card-text">end date : <input type="text" value={ contest.endDate} readonly /></p>
                    </div>
                    <div className="d-flex justify-content-around">
                    <button  onClick = { accept } name="accept" value= { contest._id} className=" green darken-1">accept</button>
                    <button  onClick = { reject} name="reject" value = { contest._id}>reject</button>
                    
                    </div>
                    <p>Add remarks</p>
                    <input type="text" class="remarks"/>
                  </div>
                </div>)
              })
            }            
        </div> 

      );
    


}


export default Leaves ;
