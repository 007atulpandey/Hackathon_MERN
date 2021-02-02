import React, { useContext, useState, useEffect } from 'react' 
import { Link,useHistory} from 'react-router-dom'
import M from 'materialize-css' 
import  './login1.css'

const Home = ()=>{

     const [ name , setName ] = useState("") ;
     const [ artist , setArtist ] = useState("") ;
     const [ link , setLink ] = useState("") ;
     const [ thumb , setThumb ] = useState("") ;
     

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
   

    const submit =  ()=>{

      fetch( "/add-videos" ,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            path : thumb, 
            title : name , 
            artist : artist  , 
            youtubeLink : link
        })
      }).then(res=>res.json())
      .then(data=>{
         if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
             
             M.toast({html:data.message,classes:"#43a047 green darken-1"})
         }
      }).catch(err=>{
          console.log(err)
      })


    };
     

    return (
      
<div class="mt-5 container containers">
	<div class="login-form">
		<h1>ADD YOUTUBE VIDEOS</h1>
		<form>
			<div class="form-group  ">
				<input type="email" onChange = {( e) => setName (e.target.value) } required />
				<label>Song Name </label>
			</div>
			<div class="form-group">
				<input type="text" onChange = {( e) => setArtist(e.target.value) } required />
				<label>Artist </label>
			</div>
            <div class="form-group">
				<input type="text" onChange = {( e) => setLink(e.target.value) } required />
				<label>YOUTUBE Link </label>
			</div>
            <div class="form-group">
				<input type="file" style ={{ all :"initial" }}  onChange = {( e) => setThumb(e.target.value) }  required="true" required />
				
			</div>
			<button class="btn green " onClick = { submit}>Add Song </button>
		</form>
	</div>
</div>

    )


}


export default Home ;

