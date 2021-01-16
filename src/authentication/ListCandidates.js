import React , { useState , useEffect}from 'react'
import './list.css'

function  ListCandidates(props){
      
    const [data , setData ] = useState([]);
      
    useEffect (()=>{
        getData();
     },[]);
      const getData = async () =>{
          
        const allData = await fetch (" https://codeforces.com/api/user.rating?handle=tourist");
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
                    <h5 class="card-title"> { contest.contestName}</h5>
                    <p class="card-text">Handle : { contest.handle}</p>
                    <p class="card-text">previous_rating :{ contest.oldRating}</p>
                    <p class="card-text">New_Rating : { contest.newRating}</p>
                    <p class="card-text"> Rank : { contest.rank}</p>
                    
                  </div>
                </div>)
              })
            }            
        </div> 

      );
    


}


export default ListCandidates ;
