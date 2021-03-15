import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  '../authentication/login1.css'
import { UserContext } from '../App';

const Addq =()=>{
    
    const { state , dispatch} = useContext( UserContext);
    const history = useHistory();    
	const [answer , setAnswer] = useState("");
	const [question , setQuestion] = useState("");
    function submit (e) {
        e.preventDefault();
        if( answer ==='' ||question==='' ){
            history.push('/addquestion');
        }
        else{

        fetch(`https://server0826.herokuapp.com/employee/` + state._id+`/add-security-question`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                answer :answer, 
                question :question
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
            console.log( data) ;
            history.push('/') ;
           }
        }).catch(err=>{
            console.log(err)
        })

    }
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
                <input type="text"  onChange = {( e) => setQuestion(e.target.value) }  required />
				
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

export default Addq; 