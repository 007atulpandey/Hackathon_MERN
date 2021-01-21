import React, { useState, useContext } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login-style.css'
import UserContext from '../App';
const AddEmployee =()=>{
	const history = useHistory();
	const { state , dispatch } = useContext(UserContext);
	const [salary , setSalary] = useState("");
	const [email , setEmail] = useState("");
	const password = "12345678";
	const [ role , setRole] = useState("");
	const team = state.name;
    const [ name , setName] = useState("");
    function submit (e) {
		e.preventDefault();
        console.log( state) ;
        fetch(`hr/`+state._id+`/login`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
			   localStorage.setItem("user",JSON.stringify(data.hr))
			   localStorage.setItem("handle" , email);
               dispatch({type:"USER",payload:data.hr})
               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
		

	}
    
    return (


<div  class="container" id="container" >
	<div class="form-container ">
		<form >
			<h1>Create Account</h1>
            <input class="form-control" id="name" placeholder="Full Name" name="name" type="text" required="true" />
			<input class="form-control" id="email" placeholder="E-mail" name="email" type="email" required="true" />
			<input class="form-control" id="role" placeholder="Role " name="role" type="text" required="true" />
            <input type="text" class="form-control" id="mobilenumber" name="mobilenumber" placeholder="Mobile Number" maxlength="10" pattern="[0-9]{10}" required="true"/>
            <button onClick = { submit} >Sign Up</button>
		</form>
	 </div>
	
</div>

    );


}

export default AddEmployee 