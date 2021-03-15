import React , { useEffect, useContext }from 'react' ;
import M from 'materialize-css'
import "./Nav.css"
import { Link , useHistory  } from 'react-router-dom'; 
const Navbar =()=>{
   
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,'left');
  }); 


  const history = useHistory (); 

    return (
        <div className = "nav-div" > 
          
  <nav className = "navbars">
    <div class="nav-wrapper">
      <Link to ="/allvideos" class="" style={{ "text-decoration" : "none "}}>Youtube link Api </Link>
      <Link style={{ "text-decoration" : "none "}}  data-target="mobile-demo" class="sidenav-trigger">
      <i className="material-icons">menu</i>
     </ Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
      Youtube  
      </ul>
    </div>
  </nav>

  <ul class="sidenav side-nav" id="mobile-demo">
    hello 
  </ul>
          

        </div >

    );

}

export default Navbar 


