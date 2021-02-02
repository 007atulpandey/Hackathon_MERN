import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './Source/Home';
import Video from './Source/Videos';
import Navbar from './navbar/Navbar';

const Routing = ()=>{

  
  return(
    <Switch>
      <Route exact path="/" >
      < Navbar/>
      <Home />
      </Route>
      <Route exact path="/allvideos" >
      <Navbar />
      <Video />
      </Route>      
    </Switch>
  )
}

function App() {
  
  return (
    
    <BrowserRouter>
      
      {/* <Navbar /> */}
      <Routing />
      
    </BrowserRouter>
    
    
  );
}

export default App;