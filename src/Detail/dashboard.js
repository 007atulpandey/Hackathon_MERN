import React , { useEffect , useState, useContext }  from 'react'
import './dashboard.css'
import { useHistory} from 'react-router-dom' 

import {UserContext} from '../App';


function Dashboard(){

     const {state , dispatch }= useContext( UserContext) ;
     const [ name , setName ]= useState ("") ;
     const [ email , setEmail] = useState ("") ;
     const [ password , setPassword ] = useState("");
     const [mobile , setMobile] = useState("") ;
     
     useEffect( ()=>{
       console.log( state) ;
       setName ( state.name) ;
       setEmail( localStorage.getItem( 'email'));
       setMobile( state.password) ;
       
     },[])
      return ( 
       
       <div className = "main">

             <div class="card welcome w-100"  >
               <div class="card-body w-100 center">
                 <h3 class="card-title hello" >Welcome to Dashboard</h3>
               </div>
             </div>
             <div class="container"  >
              
               <div >
		                <form >
		                	<h1>Change Account Details </h1>
                            <input   id="name" placeholder="Full Name" name="name" type="text" required="true" value = {name } onChange = { (e ) =>  setName( e.target.value)} />
		                	<input   id="email" placeholder="E-mail" name="email" type="email" required="true"   value = {email} onChange ={ ( e) => setEmail ( e.target.value)} />
                            <input type="text"   id="mobilenumber" name="mobilenumber" placeholder="Mobile Number" maxlength="10" pattern="[0-9]{10}" required="true" value = { mobile } onChange = { (e)=> setMobile( e.target.value)} />
                            <input   id="password" placeholder="Password" name="password" type="text"  required="true" value = { password}  onChange = { (e ) => setPassword( e.target .value)}/>
                            <input type="password"   id="confirm" name="repeatpassword" placeholder="Repeat Password" required="true"/>
                            <input type="text"   id="roll" value = { state.rank}  required="true"/>
                            
                            <input type="text"   id="salary" value = { state.maxRating}required="true"/>

                            <button className ="btn-success" > Change state </button>
		                </form>
            	 </div>

             </div>
            

      </div > 

     )
    

}


export default Dashboard ;











