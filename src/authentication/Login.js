import React, { useContext } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login-style.css'
import {UserContext} from '../App'
const Login =()=>{
	
	const { state , dispatch } = useContext( UserContext) ;
	const history = useHistory();
	// function login (e){
		
	// 	const handle = document.getElementById("handle");
	// 	const email = document.getElementById("email");
	// 	localStorage.setItem('handle',handle.value);
	// 	localStorage.setItem('email',email.value);
    //     history.push('/dashboard');

	// }
    	
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


	function SignUp(){
		const signUpButton = document.getElementById('signUp');
  		const signInButton = document.getElementById('signIn');
  		const container = document.getElementById('container');
  		container.classList.add("right-panel-active");

	}
    function SignIn(){
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');
		container.classList.remove("right-panel-active");
	}
   
    
    return (


<div  class="container" id="container" >
	<div class="form-container sign-up-container">
		<form >
		<h1>Sign in</h1>
			<input  name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<Link to="/">Forgot your password?</Link>
			<button type="submit" value="login" name="login">Sign In</button>
		</form>
	 </div>
	<div class="form-container sign-in-container">
		<form >
			<h1>Sign in</h1>
			<input id = "email"  name="email" type="email" placeholder="Email" />
			<input id= "handle" name="password" type="text" placeholder="Handle" />
			<Link to="/">Forgot your password?</Link>
			<button onClick = { login }>Sign Ins</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome !</h1>
				<p>Login As A Candidate .....</p>
				<button class="ghost" id="signIn" onClick= { ()=>SignIn() }>Candidates</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Welcome!</h1>
				<p>Login As HR</p>
				<button class="ghost" id="signUp" onClick= { ()=>SignUp() }>HR</button>
			</div>
		</div>
	</div>
</div>

    );


}

export default Login 