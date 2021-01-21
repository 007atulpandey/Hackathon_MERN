import React, { useState } from 'react'
import { Chart } from "react-google-charts";
import './login.css';

const Home = ()=>{
     
   const [ value , setValue ] = useState( "");
   function handleChange (e ) {
    setValue( e.target.value);
    console.log(e) ;
   }

    return (
      < div className="home-page mt-5" >  
      <div className = "row " style = { {" height" : "400px" } } >
      <div className ="col-md-4 col-sm-12 center pt-5 pb-5 pl-5" > 
      <h2> Make Things Possible </ h2 > 
      <h6>
       We turn ideas into reality for our clients and 
       around the world. Our people come from a variety of academic and professional 
       backgrounds including finance, engineering, science, technology and the humanities
       to make things possible.
      </h6>
      </div>
      <div className ="col-md-8 col-sm-12" style= {{ " height" : "400px"}}>  
      <Chart
      width={'100%'}
      height={'400px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540],
      ]}
      options={{
        title: 'Company Performance',
        // hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        // vAxis: { minValue: 0 },
        // chartArea: { width: '70%', height: '80%' },
        pieHole: 0.4,
        is3D : true 
        // lineWidth: 25
      }}
    />
   </div> 
    </div > 
    <hr style = {{"background" :"blue" ,"height":"4px" , "width" :"400px" , "display":"flex"}} />
      <div className = "row">
     < div className ="col-md-6 pt-5 pl-5" >
     <h2 >
       Lorem Epsum 
       </h2> 
       <h6> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         In rutrum fermentum odio in scelerisque. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae; 
         Donec dapibus iaculis tortor, in laoreet ipsum luctus nec. 
         </h6>
     </div >
     < div className="col-md-6 center"> 
        <img height={ "400px"}  src = "https://codingcompetitions.withgoogle.com/static/codejam-hero-830.jpg" />
      </div>   
      
    </div >


    <div className ="end-bar " >
    Follow Us on :
    <i class="fab fa-facebook-f"></i>
    <i class="fab fa-instagram"></i>
    <i class="fab fa-google-plus-g"></i>
    <i class="fab fa-twitter"></i>
    <i class="fab fa-linkedin"></i>
    <hr style={{'height':'2px', 'background':'grey'}}/>
    </div> 
      </div > 
    )


}


export default Home ;
