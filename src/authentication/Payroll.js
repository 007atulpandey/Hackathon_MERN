import React , { useState , useEffect}from 'react'
import './list.css'
import { Link } from 'react-router-dom'; 

function  Payroll(props){
      
    const [data , setData ] = useState([]);
    const [istrue,setIstrue]=useState(false);
    const name= JSON.parse(localStorage.getItem('user'));
    useEffect (()=>{
        getData();
     },[]);
      const getData = async () =>{
        fetch ("/hr/"+name._id+"/employees" , {
          method : "get" ,
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        })
        .then( data => data.json())
        .then( data =>{
          console.log(data);
          setData(data);
          setIstrue(true);
          /*if(!data)return null;
          else return data;*/
        })
     
      };
      useEffect(()=>{
        Payrollcomp();
      },[istrue])
     const ch=1;
     /* useEffect(()=>{
        fetch ("/hr/"+name._id+"/employees" , {
          method : "get" ,
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then( data => data.json())
        .then( data =>{
          console.log(data);
          setData(data);
          console.log(data);

        })
       // Payrollcomp();
      },[])
      useEffect(()=>{
        if(data!==undefined)
         {Payrollcomp();}
      },[data])*/
     function Payrollcomp(){
      if(istrue)
      {
        console.log(istrue)
        if(data.employees!==undefined)
        {return (<tbody>
                             {
                              data.employees.map ( ( e ) =>{
                              return (
                                      <tr>
                                      <td>{e.name}</td>
                                      <td>{e.team}  </td>
                                      <td>{e.role}</td>
                                      <td><input type="text" value={e.salary} readonly/></td>
                                      <td> <Link to={"/"+e._id+"/allowdeduct"}><i class="material-icons">create</i></Link></td>
                                      </tr>
                                      );
                                                           }
                                                )
                            }
               </tbody>);
                            }

      }
      return <p>Loading...</p>;
     }
      return (
            <div class="container list-candidate">
              <table>
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Role</th>
                            <th>Salary</th>
                        </tr>
                      </thead>
                     <Payrollcomp/>
             </table>
            </div>
             );
}


export default Payroll ;
