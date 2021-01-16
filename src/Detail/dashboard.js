import React , { useEffect , useState }  from 'react'
import './dashboard.css'



function Dashboard(){

     const [ data , setData ] = useState([ ]) ;

     useEffect( () =>{
         getData (); 
     }, []);

     const getData  = async ()=> {
        const key = "https://codeforces.com/api/user.info?handles=" + localStorage.getItem('handle');
        
        const allData = await fetch (key); 
        const finalData = await allData.json () ;
        console.log( finalData.result[ 0]);
        setData ( finalData.result[ 0]) ; 
     }
    
     return ( 
       <div className = "main">
             
             <div class="card welcome"  >
               <div class="card-body">
                 <h3 class="card-title hello" >Welcome to Dashboard</h3>
                 <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                 <a href="#" class="btn btn-primary">Go somewhere</a>
               </div>
             </div>
             <div class="card body"  >
               <div class="card-body">
                 <h3 class="card-title hello" >Welcome to Dashboard</h3>
                 <div className = "row mt-4"> 
                 <div className="col-md-6 col-sm-12 center " >  
                 <img class="card-img-top image" src={"https:"+data.avatar} alt="Card image cap"/>
                </div >
                <div className="col-md-6 col-sm-12 left" >  
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.firstName +" "+data.lastName }</ h5>
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.country  }</ h5>
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.friendOfCount}</ h5>
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.handle }</ h5>
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.maxRank }</ h5>
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.maxRating }</ h5>
                 < h5 class="card-text " style = { { "font-family":"Poppins"}}> { data.organization }</ h5> 
                 </div>
                 </ div > 
                 
               </div>
             </div>
            

      </div > 

     )
    

}


export default Dashboard ;











