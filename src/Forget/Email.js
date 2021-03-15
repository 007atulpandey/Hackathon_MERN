import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  '../authentication/login1.css'

const Email =()=>{
    const history = useHistory();    
	const [email , setEmail] = useState("");
    function submit (e) {
        var data = {};
        if( email != "")
        data.email = email ;
		e.preventDefault();
        // console.log( state) ;
        fetch(`https://server0826.herokuapp.com/hr/12345678/search`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
				data
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
            //    console.log( data)
			   
			// history.push('/question')
            // console.log( "success");
            if( data.employees.length ===0 ) {
                M.toast({html:"Not Found",classes:"#c62828 red darken-3"})

            }
            else {
                // M.toast({html: data.error,classes:"#c62828 green darken-3"})
                localStorage.setItem('email', data.employees[ 0] .email);
                localStorage.setItem('question' , data.employees[0].name);
                localStorage.setItem('Id' , data.employees[0]._id);
                history.push('/question');
            }
            
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
		<h1> Enter Your Email</h1>
		<form>
			<div class="form-group  ">
				<input type="email" onChange = {( e) => setEmail(e.target.value) } required />
				<label>Email</label>
			</div>
			<button class="btn green " onClick = { submit}> Next </button>
		</form>
	</div>
</div>

    );


}

export default Email 