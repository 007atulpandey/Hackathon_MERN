import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login1.css'
import {UserContext} from '../App'
const Signin =()=>{
	
	
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
        fetch(`hr/`+state._id+`/add-employee`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                password,
				email,
				name ,
				salary,
				role ,
				team,

            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
			   
			history.push('/addemployee')
			console.log( "success");
           }
        }).catch(err=>{
            console.log(err)
        })
	}  



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

  

    
    
    return (

<div class="mt-5 container containers">
	<div class="login-form">
		<h1>Add Employee</h1>
		<form>
			<div class="form-group  ">
				<input type="email" onChange = {( e) => setEmail(e.target.value) } required />
				<label>Email</label>
			</div>
			<div class="form-group">
				<input type="text" onChange = {( e) => setName(e.target.value) } required />
				<label>Name</label>
			</div>
            <div class="form-group">
				<input type="text" onChange = {( e) => setRole(e.target.value) } required />
				<label>Role </label>
			</div>
            <div class="form-group">
				<input type="text" id="mobilenumber" name="mobilenumber"  onChange = {( e) => setSalary(e.target.value) }  pattern="[0-9]{10}" required="true" required />
				<label>salary</label>
			</div>
			<button class="btn green " onClick = { submit}>Add user </button>
		</form>
	</div>
</div>

    );


}

export default Signin 