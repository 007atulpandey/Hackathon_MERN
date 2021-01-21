import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login1.css'
import {UserContext} from '../App'
const Login =()=>{
	
	const { state , dispatch } = useContext( UserContext) ;
	const history = useHistory();
	const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    useEffect( ( ) =>{
    const labels = document.querySelectorAll(".form-group label");

    labels.forEach((label) => {
        label.innerHTML = label.innerText
            .split("")
            .map(
                (letter, i) =>
                    `<span style="transition-delay: ${i * 50}ms";>${letter}</span>`
            )
            .join("");
    });
    } ,[]);
    
    const login  = async (e)=> {
		e.preventDefault();
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
		}
        fetch("/hr/login",{
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

<div class="mt-5 container containers">
	<div class="login-form">
		<h1>Add Employee</h1>
		<form>
			<div class="form-group  ">
				<input type="email" onChange = {(e ) => setEmail( e.target.value)} required />
				<label>Email</label>
			</div>
			<div class="form-group">
				<input type="password" onChange = {(e ) => setPasword( e.target.value)} required />
				<label>Password</label>
			</div>
			<button class="btn green " onClick = { login}> Login  </button>
		</form>
	</div>
</div>

    );


}

export default Login 