import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  '../authentication/login1.css'

const Password =()=>{
    

    const history = useHistory();    
	const [password , setPassword] = useState("");
    function submit (e) {
        e.preventDefault();
        var data  = {};
        data.password = password;
        fetch(`/employee/update-password`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                newPassword:password ,
                empId : localStorage.getItem('Id')
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"}) 
            }
           else{
            M.toast({html: "Password Updated Successfully",classes:"#c62828 green darken-3"}) 
                          
            localStorage.clear()
            history.push('/signin');
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
		<h1> Enter New Password</h1>
		<form>
			<div class="form-group  ">
				<input type="text" onChange = {( e) => setPassword(e.target.value) } required />
				<label>Password</label>
			</div>
			<button class="btn green " onClick = { submit}> Next </button>
		</form>
	</div>
</div>

    );


}

export default Password; 