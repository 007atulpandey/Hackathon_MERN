import React from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login-style.css'

const AddEmployee =()=>{

    function submit (e) {
	    e.preventDefault();
		const name = document.querySelectorAll("#name");
		const email = document.querySelectorAll( "#email");
		const password = document.querySelectorAll("#password");
		const repeat = document.querySelectorAll("#confirm");
        if( password != repeat)  {
			M.toast({html:  'Password Not Matched!!!!!!!' });
		}
		else {
			console.log("you'r successful personalle")
		}

	}
    
    return (


<div  class="container" id="container" >
	<div class="form-container ">
		<form >
			<h1>Create Account</h1>
            <input class="form-control" id="name" placeholder="Full Name" name="name" type="text" required="true" />
			<input class="form-control" id="email" placeholder="E-mail" name="email" type="email" required="true" />
            <input type="text" class="form-control" id="mobilenumber" name="mobilenumber" placeholder="Mobile Number" maxlength="10" pattern="[0-9]{10}" required="true"/>
            <input class="form-control" id="password" placeholder="Password" name="password" type="password"  required="true"/>
            <input type="password" class="form-control" id="confirm" name="repeatpassword" placeholder="Repeat Password" required="true"/>
            <button onClick = { submit} >Sign Up</button>
		</form>
	 </div>
	{/* <div class="form-container sign-in-container">
		<form role="form" action="" method="post" id="" name="login">
			<h1>Sign in</h1>
			<input  name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button type="submit" value="login" name="login">Sign In</button>
		</form>
	</div> */}
	{/* <div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h3>Add Employee</h3>
				<p>Add Employee By Entering the details </p> */}
				{/* <button class="ghost" id="signIn" onClick= { ()=>SignIn() }>Sign In</button> */}
			{/* </div> */}
			{/* <div class="overlay-panel overlay-right">
				<h1>Welcome!</h1>
				<p>Enter your personal details and start journey with us</p>
				 <button class="ghost" id="signUp" onClick= { ()=>Signup() }>Sign Up</button>
			</div>  */}
		{/* </div>
	</div> */}
</div>

    );


}

export default AddEmployee 