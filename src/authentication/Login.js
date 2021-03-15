import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login.css'
import {UserContext} from '../App'
const Login =()=>{
	
	const { state , dispatch } = useContext( UserContext) ;
	const history = useHistory();
	const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    useEffect( ( ) =>{
        
        const switchers = [...document.querySelectorAll('.switcher')]

        switchers.forEach(item => {
          item.addEventListener('click', function() {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'))
            this.parentElement.classList.add('is-active')
          })
        })

        
    } ,[]);
    
    const login  = async (e)=> {
		e.preventDefault();
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
		}
        fetch("https://server0826.herokuapp.com/hr/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
                
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
               localStorage.setItem("login" , "hr") ;
               dispatch({type:"USER",payload:data.hr})
               
              

               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    
    const empLogin  = async (e)=> {
		e.preventDefault();
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
		}
        fetch("https://server0826.herokuapp.com/employee/login",{
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
			   localStorage.setItem("user",JSON.stringify(data.employee))
               localStorage.setItem("handle" , email);               
               localStorage.setItem("login" , "employee") ;
               dispatch({type:"USER",payload:data.employee})
               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               if(data.employee.securityAnswer){
               history.push('/')
               }
               else{
                   history.push('/addquestion');
               }
           }
        }).catch(err=>{
            console.log(err)
        })
    }

  

    
    
    return (



<section class="forms-section">
  <div class="forms">
    <div class="form-wrapper is-active">
      <button type="button" class="switcher switcher-login">
        HR 
        <span class="underline"></span>
      </button>
      <form class="form form-login">
        <fieldset>
          <div class="input-block">
            <label for="login-email">E-mail</label>
            
				<input type="email" onChange = {(e ) => setEmail( e.target.value)} required />
          </div>
          <div class="input-block">
            <label for="login-password">Password</label>
            <input type="password" onChange = {(e ) => setPasword( e.target.value)} required />
          </div>
        </fieldset>
        <button class="btn green " onClick = { login}> Login  </button>
      </form>
    </div>
    <div class="form-wrapper">
      <button type="button" class="switcher switcher-signup">
        Employee 
        <span class="underline"></span>
      </button>
      <form class="form form-signup">
        <fieldset>
         <div class="input-block">
            <label for="signup-email">E-mail</label>
            
		<input type="email" onChange = {(e ) => setEmail( e.target.value)} required />
          </div>
          <div class="input-block">
            <label for="signup-password-confirm">Password</label>
            <input type="password" onChange = {(e ) => setPasword( e.target.value)} required />
          </div>
          <Link to = "/email" > Forget  Password</ Link>
        </fieldset>
        <button class="btn green mt-4" onClick = { empLogin}> Login  </button>
      </form>
    </div>
  </div>
</section>

    );


}

export default Login 