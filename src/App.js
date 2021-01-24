import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './navbar/Navbar' ;
import Home from './authentication/Home'
import Login from './authentication/Login'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import AddEmployee from './authentication/AddEmployee';
import Candidates from './checking_props/candidates' 
import ListCandidates from './authentication/ListCandidates'
import Bonus from './authentication/Bonus'
import Loan from  './Manage/bonus'
import Leaves from './authentication/Leaves'
import Payroll from './authentication/Payroll'
import Dashboard from './Detail/dashboard';
import { reducer ,initialState } from './reducer/userReducer'
import Signin from './authentication/Login1'
import EmployeeDetail from './Detail/employee_detail'
import LeaveReq from './Manage/leaveReq';
import BonusReq from './Manage/bonusReq';
import BonusReal from './Manage/bonusReal';
import Search from './Detail/search';
import Email from './Forget/Email';
import Question from './Forget/Question';
export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(async ()=>{
    const user =  await JSON.parse(localStorage.getItem("user"))
    if(user){
       await  dispatch({type:"USER",payload:user})
       history.push("/")
     
    }else{
          await history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Navbar />
      <Home />
      </Route>
      <Route path="/signin">
        <Navbar />
        <Login />
      </Route>
      <Route path="/search">
        <Navbar />
        <Search />
      </Route>
      <Route path="/addemployee">
        <Navbar />
        <Signin />
      </Route>
      {/* <Route path="/addemployee">
      <Navbar />
        <AddEmployee />
      </Route> */}
      <Route exact path="/candidates">
      <Navbar />
        <ListCandidates />
      </Route>
      <Route exact path="/dashboard">
      <Navbar />
        <Dashboard />
      </Route>
      <Route exact path="/leaves">
      <Navbar/>
      <Leaves />
      </Route>
      <Route exact path="/loan">
      <Navbar/>
      <Loan/>
      </Route>
      <Route exact path="/bonus">
       <Navbar/>
      <Bonus />
      </Route>
      <Route exact path="/payroll">
      <Navbar/>
      <Payroll />
      </Route>
      <Route exact path="/hr/:hrId/employees/:empId">
      <Navbar/> 
      <EmployeeDetail />
      </Route>
      <Route exact path ="/:empId/create-leave-req">
      <Navbar/>
      <LeaveReq  />
      </Route>
      <Route exact path ="/:empId/create-loan-req">
      <Navbar/>
      <BonusReq  />
      </Route>
      <Route exact path ="/:empId/create-bonus-req">
      <Navbar/>
      <BonusReal  />
      </Route>
      <Route exact path ="/email">
      <Navbar/>
      <Email  />
      </Route>
      <Route exact path ="/question">
      <Navbar/>
      <Question  />
      </Route>
      
     {/*  
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route> */}
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      
      {/* <Navbar /> */}
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;