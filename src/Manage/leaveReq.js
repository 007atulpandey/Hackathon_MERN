import  React, { useContext, useState } from 'react'
import {UserContext} from '../App';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css' 
const LeaveReq = () =>{
  const history = useHistory();
  const { state , dispatch} = useContext ( UserContext) ;
  const [ start ,setStart ] = useState("");
  const [ end , setEnd ] = useState ("");
  const [ reason , setReason ] = useState("");
  const Leave  = async (e)=> {
		e.preventDefault();
    fetch("/employee/"+state._id+"/create-leave-req",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                startDate : start , 
                endDate:end,
                reason
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }    
           else{
               M.toast({html:"Report Added Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }




   
    return (

        <form>
        <label for="example-date-input" class="col-2 col-form-label">Start Date</label>
        <div class="form-group row">
          <div class="col-10">
            <input class="form-control" type="date"  onChange = {(e) => { setStart(e.target.value)}} id="example-date-input"/>
          </div>
          
        </div>
        <label for="example-date-input" class="col-2 col-form-label">End Date</label>
        <div class="form-group row">
          <div class="col-10">
            <input class="form-control" type="date" onChange = {(e) => { setEnd(e.target.value)}}  id="example-date-input"/>
          </div>
        </div>
        
        <label for="exampleTextarea">Reason </label>
        <div class="form-group">
              <textarea class="form-control" id="exampleTextarea" onChange = {(e) => { setReason(e.target.value)}} rows="3"></textarea>
        </div>
        <button onClick = { Leave} class="btn btn-primary">Submit</button>
      </form>

    )



}

export default LeaveReq 