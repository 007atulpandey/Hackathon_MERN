import React , { useState , useEffect, useContext}from 'react'
// import './list.css'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App';
import M from 'materialize-css'

const Loan = () => {
      
    const [data , setData ] = useState([]);
    const {state , dispatch } = useContext( UserContext) ;
    const history = useHistory();
    if( state === null)
       history.push("/")
    useEffect (()=>{
        getData();
        
        console.log("useEffect")
     },[]);
      const getData = async () =>{
        const data = await fetch ("/hr/"+state._id+"/loan-reqs/1");
        const final = await data.json();
        console.log( final.loans) ;
        setData( final.loans);

      };
      // /    hr/:hrId/leave-reqs/:leaveId/:status   : post
      const accept = (e)=>{
        console.log ( e.target.value)
        fetch ("/hr/"+state._id+"/loan-reqs/"+e.target.value+"/1" , {
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
              
            console.log("asasdad")
            M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
            history.push('/loan')
          }
        }
         
        )
          

      }
      const reject = (e)=>{
             
        fetch ("/hr/"+state._id+"/loan-reqs/"+e.target.value+"/2" , {
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
            history.push('/loan')
          }
          else{
            console.log("asasdad")
            M.toast({html:"Rejected",classes:"#43a047 red darken-1"})
            history.push('/loan')
          }
        }
         
        )
          

      }

     
      return (
        <div class="container list-candidate">
              <table>
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>employee id</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Bonus</th>
                            <th>Action</th>

                        </tr>
                      </thead>
                      <tbody>
                      {data.map ( ( contest ) =>{
                return (
                        <tr>
                        <td>{contest.employee.name}</td>
                        <td>{contest.employee.email }</td>
                        <td>IT</td>
                        <td>{ contest.employee.role}</td>
                        <td><input type="text" value={ contest.amount} readonly/></td>
                        {/* {console.log( contest._id)} */}
                        <button style = {  { all : "none" ,color: "green"}} onClick = { accept} value = { contest._id}> <i class="fas fa-check-circle"></i> </button>
                        <button style = { {color: "red "}} onClick = { reject} value = { contest._id}><i class="fas fa-times-circle"></i></ button>

                        </tr>
                        )
              })
                       }
                       </tbody>
             </table>
            </div>


      );
    


}


export default Loan ;
