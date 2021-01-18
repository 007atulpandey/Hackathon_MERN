import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login1.css'
import {UserContext} from '../App'
const Signin =()=>{
	
	const { state , dispatch } = useContext( UserContext) ;
	const history = useHistory();
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
	   const handle = document.getElementById("handle");
	   const email = document.getElementById("email");
	   localStorage.setItem('handle',handle.value);
	   localStorage.setItem('email',email.value);
	   const key = "https://codeforces.com/api/user.info?handles=" +handle.value;
	   
	   const allData = await fetch (key); 
	   const finalData = await allData.json () ;
	   console.log( finalData.result[ 0]);
	   await dispatch ( { type : "USER" , payload : finalData.result[ 0] }) 
	   await history.push('/dashboard');
	   
	   // setPassword ( data.password);
	}

  

    
    
    return (

<div class="mt-5 container containers">
	<div class="login-form">
		<h1>Add Employee</h1>
		<form>
			<div class="form-group  ">
				<input type="email" required />
				<label>Email</label>
			</div>
			<div class="form-group">
				<input type="text" required />
				<label>Name</label>
			</div>
            <div class="form-group">
				<input type="text" required />
				<label>Role </label>
			</div>
            <div class="form-group">
				<input type="text" id="mobilenumber" name="mobilenumber" placeholder="Mobile Number" maxlength="10" pattern="[0-9]{10}" required="true" required />
				<label>Mobile Number</label>
			</div>
			<button class="btn green ">Add user </button>
		</form>
	</div>
</div>

    );


}

export default Signin 