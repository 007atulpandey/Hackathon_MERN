import React , { useState , useEffect}from 'react'
import './list.css'

function  Bonus(props){
      
    const [data , setData ] = useState([]);
      
    useEffect (()=>{
        getData();
     },[]);
      const getData = async () =>{
          
        const allData = await fetch ("https://codeforces.com/api/user.rating?handle=tourist");
        const finalData = await allData.json();
        // console.log(finalData) ;
        setData( finalData.result);

      };

     
      return (
            <div class="container list-candidate">
              <table>
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>employee id</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Bonus</th>
                        </tr>
                      </thead>
                      <tbody>
                      {data.map ( ( contest ) =>{
                return (
                        <tr>
                        <td>{contest.handle}</td>
                        <td>12345896</td>
                        <td>IT</td>
                        <td>SDE-I</td>
                        <td><input type="text" value={ contest.oldRating} readonly/></td>
                        </tr>
                        )
              })
                       }
                       </tbody>
             </table>
            </div>
             );
}


export default Bonus ;
