import  React, { useContext, useState } from 'react'
import {UserContext} from '../App';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css' 
const BonusReq = () =>{
  const history = useHistory();
  const { state , dispatch} = useContext ( UserContext) ;
  const [ start ,setStart ] = useState("");
  
  const Lone  = async (e)=> {
		e.preventDefault();
    fetch("/employee/"+state._id+"/create-loan-req",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                isLoan: "True" ,
                amount : start 
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }    
           else{
               console.log(data);
               M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }




   
    return (

        <form>
        <label for="example-date-input" class="col-2 col-form-label">Loan Amount</label>
        <div class="form-group row">
          <div class="col-10">
           $  <input class="form-control" type="text"  onChange = {(e) => { setStart(e.target.value)}} id="example-date-input"/>
          </div>
          
        </div>
        <button onClick = { Lone} class="btn btn-primary">Submit</button>
      </form>

    )



}

export default BonusReq 