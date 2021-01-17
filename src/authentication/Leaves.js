import React , { useState , useEffect}from 'react'
import './list.css'

function  Leaves(props){
      
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
        <div class= " container list-candidate " > 
            { 
              data.map ( ( contest ) =>{
                return (<div class="card ">
                  <div class="card-body">
                    <h5 class="card-title">{contest.handle}</h5>
                    <p class="card-text">Employee rank: senior developer</p>
                    <p className="card-text">Reason: holiday vacation</p>
                    <div className="d-flex justify-content-around ">
                    <p class="card-text">start date : <input type="text" value={ contest.oldRating} readonly/></p>
                    <p class="card-text">end date : <input type="text" value={ contest.newRating} readonly /></p>
                    </div>
                    <div className="d-flex justify-content-around">
                    <button type="submit" value="accept" name="accept" className=" green darken-1">accept</button>
                    <button type="submit" value="reject" name="reject">reject</button>
                    
                    </div>
                    <p>Add remarks</p>
                    <input type="text" class="remarks"/>
                  </div>
                </div>)
              })
            }            
        </div> 

      );
    


}


export default Leaves ;
