import React , { useEffect , useState, useContext }  from 'react'
import '../Detail/dashboard.css'
import {useParams} from 'react-router-dom'
import { useHistory} from 'react-router-dom' 
import M from 'materialize-css';
import {UserContext} from '../App';


function AllowDeduct()
{
     const {hrId , empId} = useParams(); 
     const {state , dispatch }= useContext( UserContext) ;
     const [emp , setEmp ] = useState({});
     const [alw,setAlw]=useState([]);
     const [istrue,setIstrue]=useState([]);
     const [ded,setDed]=useState([]);
     const [istruededuct,setIstruededuct]=useState([]);
     useEffect( ()=>{
       getData();
     },[])
     useEffect( ()=>{
       Printallow();
     },[istrue])
      useEffect( ()=>{
       Printdeduct();
     },[istruededuct])
     
     const getData = async () =>{

          fetch ('/hr/'+hrId+'/employees/'+empId,{
            method:"get",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
        })
        .then ( data => data.json())
        .then( user => {
                setEmp( user.employee);
                setAlw(user.employee.allowances);
                setDed(user.employee.deduction);
                setIstrue(true);
                setIstruededuct(true);
        })
        .catch( error => console.log(error)) ;

         
     }
     function check1(){
      const salary=document.getElementById("sal").value;
      const team=emp.team;
      //console.log(salary);
      //console.log(team);
      fetch ('/hr/'+hrId+'/employees/'+empId+"/edit",{
            method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            salary,team
          })
        })
        .then ( data => data.json())
        .then( user => {
            if(user)console.log("ook")
             console.log(user);    
        })
        .catch( error => console.log(error)) ;
      return null;
     }
      function check2(){
      const salary=emp.salary;
      const team=document.getElementById("teamname").value;
      //console.log(salary);
      //console.log(team);
      fetch ('/hr/'+hrId+'/employees/'+empId+"/edit",{
            method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            salary,team
          })
        })
        .then ( data => data.json())
        .then( user => {
            if(user)console.log("ook")
             console.log(user);    
        })
        .catch( error => console.log(error)) ;
      return null;
     }


     function addallow(){
      const title=document.getElementById("allowname").value;
      const amount=document.getElementById("allowamt").value;
      const time=document.getElementById("allowtime").value;
      console.log(title);
           fetch ('/hr/'+emp.hr+'/employees/'+empId+"/add-allowance",{
            method:"post",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            title,amount,time
          })
        })
        .then ( data => data.json())
        .then( user => {
            if( user.error){
            M.toast({html: user.error,classes:"#c62828 red darken-3"})
          }
          else{
            M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
          }  
        })
        .catch( error => console.log(error)) ;
      return null;
     }



    function adddeduct(){
      const title=document.getElementById("deductname").value;
      const amount=document.getElementById("deductamt").value;
      const time=document.getElementById("deducttime").value;
      //console.log(title);
           fetch ('/hr/'+emp.hr+'/employees/'+empId+"/add-deduction",{
            method:"post",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            title,amount,time
          })
        })
        .then ( data => data.json())
        .then( user => {
            if( user.error){
            M.toast({html: user.error,classes:"#c62828 red darken-3"})
          }
          else{
           //document.getElementById("deductname").value("");
            M.toast({html:"Added Successfully",classes:"#43a047 green darken-1"})
          }  
        })
        .catch( error => console.log(error)) ;
      return null;
     }
function deleteallow(e)
   {
      console.log(e.target.value)
      fetch ('/hr/'+emp.hr+'/employees/'+empId+"/remove-allowance/"+e.target.value,{
            method:"post",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
        })
        .then ( data => data.json())
        .then( user => {
            if( user.error){
            M.toast({html: user.error,classes:"#c62828 red darken-3"})
          }
          else{
           //document.getElementById("deductname").value("");
            M.toast({html:"Removed Successfully",classes:"#43a047 green darken-1"})
          }  
        })
        .catch( error => console.log(error)) ;
      return null;
   }
function Printallow(){
   if(istrue)
   { 
    if(emp.allowances !== undefined)
     { 
                       // console.log(emp.allowances);
                        return (
                          <div> 
                          {
                          emp.allowances.map((e)=>{
                                                   return(<div class="d-flex justify-content-between">
                                                    <input type="text" value={e.title} readonly/>
                                                    <input type="text" value={e.amount} readonly/>
                                                    <input type="text" value={e.time} readonly/>
                                                   
                                                    <button  onClick = { deleteallow }  name="deleteallow"  value={ e._id } className="green darken-1 waves-effect waves-dark btn" ><i class="material-icons">delete</i></button>
                                                         </div>);
                                                 })
                          }
                          
                          </div>
                               );
      }

   }
  return(<p>Loading..</p>);
}
function deletededuct(e)
   {
      console.log(e.target.value)
      fetch ('/hr/'+emp.hr+'/employees/'+empId+"/remove-deduction/"+e.target.value,{
          method:"post",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
        })
        .then ( data => data.json())
        .then( user => {
            if( user.error){
            M.toast({html: user.error,classes:"#c62828 red darken-3"})
          }
          else{
           //document.getElementById("deductname").value("");
            M.toast({html:"Removed Successfully",classes:"#43a047 green darken-1"})
          }  
        })
        .catch( error => console.log(error)) ;
      return null;
   }
function Printdeduct(){
   if(istruededuct)
   { 
    if(emp.deduction !== undefined)
     { 
                        
                        return (
                          <div> 
                          {
                          emp.deduction.map((e)=>{
                                                   return(<div class="d-flex justify-content-between">
                                                    <input type="text" value={e.title} readonly/>
                                                    <input type="text" value={e.amount} readonly/>
                                                    <input type="text" value={e.time} readonly/>
                                                    <button  onClick = { deletededuct }  name="deletededuct" value={ e._id } className="green darken-1 waves-effect waves-dark btn"><i class="material-icons">delete</i></button>
                                                         </div>);
                                                 })
                          }
                          
                          </div>
                               );
      }

   }
  return(<p>Loading..</p>);
}
      return ( 
       
       <div className = "main">

             <div class="card welcome w-100"  >
               <div class="card-body center w-100">
                 <h3 class="card-title hello center" >edit details</h3>
               </div>
             </div>
             <div class="container" >
               <div className = "w-100" >

                            <label > Name : </label> <input   id="name"  name="name" type="text" required="true" value = {emp.name }  /> 
                            <label > Email :</label> <input   id="email"  name="email" type="email" required="true"   value = {emp.email}  /> 
                             Salary :
                             <div class="d-flex justify-content-center"> 
                             <input type="text" placeholder = { "$"+emp.salary } id="sal"/> 
                             <button  onClick = { check1 }  name="check1"  id="check1" className="green darken-1 waves-effect waves-ldark btn"><i class="material-icons">add</i></button>
                             </div>
                          
                             Team :<div className="d-flex justify-content-center"> 
                             <input type="text"  placeholder = { emp.team} id="teamname"/>
                            <button  onClick = { check2 }  name="check2" id="check2"  className="green darken-1 waves-effect waves-dark btn"><i class="material-icons">add</i></button>
                            </div>

                            <label > HR : </label><input type="text"   id="salary" value = { emp.hr}required="true"/>
                           

                            <label>Allowances:</label>
                            <div className="d-flex justify-content-between">
                                <Printallow/>
                                <br/>
                            </div>

                            <div class="d-flex justify-content-center">
                            <input type="text" placeholder = "allowance name" id="allowname"/>
                            <input type="text" placeholder = "allowance amount" id="allowamt"/>
                            <input type="text" placeholder="yearly/monthly" id="allowtime"/>
                            <button  onClick = { addallow }  name="mark"  className="green darken-1 waves-effect waves-dark btn"><i class="material-icons">add</i></button>
                              </div>

                            <label>Deduction:</label>
                            <div className="d-flex justify-content-between">
                               <Printdeduct/>
                            </div>
                            <div class="d-flex justify-content-center">
                            <input type="text" placeholder = "deduction name" id="deductname"/>
                            <input type="text" placeholder = "deduction amount" id="deductamt"/>
                            <input type="text" placeholder="yearly/monthly" id="deducttime"/>
                            <button  onClick = { adddeduct }  name="mark"  className="green darken-1 waves-effect waves-dark btn"><i class="material-icons">add</i></button>
                              </div>

                  </div>

             </div>
            

      </div > 

     )
    

}


export default AllowDeduct ;











