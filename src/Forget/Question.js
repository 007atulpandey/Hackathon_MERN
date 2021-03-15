import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  '../authentication/login1.css'

const Question =()=>{
    

    const history = useHistory();    
	const [answer , setAnswer] = useState("");
    function submit (e) {
        e.preventDefault();
        

        fetch(`/employee/check-secure-answer`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                answer :answer, 
                empId : localStorage.getItem('Id')
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               
            history.push('/password') ;
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
		<h1> Enter Your Security Answer</h1>
		<form>
			<div class="form-group  ">
                <input type="text"  value = { localStorage.getItem('question')} required />
				
			</div>
			<div class="form-group  ">
				<input type="text" onChange = {( e) => setAnswer(e.target.value) } required />
				<label>Answer</label>
			</div>
			<button class="btn green " onClick = { submit}> Next </button>
		</form>
	</div>
</div>

    );


}

export default Question; 