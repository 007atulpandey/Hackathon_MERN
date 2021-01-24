import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './navbar/Navbar' ;
import Home from './authentication/Home'
import Login from './authentication/Login'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import AddEmployee from './authentication/AddEmployee';
import Candidates from './checking_props/candidates' 
import ListCandidates from './authentication/ListCandidates'
import OpenAttendance from './authentication/OpenAttendance'
import Bonus from './authentication/Bonus'
import Leaves from './authentication/Leaves'
import Payroll from './authentication/Payroll'
import Attendance from './authentication/Attendance'
import AllowDeduct from './authentication/AllowDeduct'
import Dashboard from './Detail/dashboard';
import { reducer ,initialState } from './reducer/userReducer'
import Signin from './authentication/Login1'
import EmployeeDetail from './Detail/employee_detail'
import LeaveReq from './Manage/leaveReq';

export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
        dispatch({type:"USER",payload:user})
     
    }else{
           history.push('/signin')
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
        <ListCandidates  data = { Candidates}/>
      </Route>
      <Route exact path="/dashboard">
      <Navbar />
        <Dashboard />
      </Route>
      <Route exact path="/leaves">
      <Navbar/>
      <Leaves data={Candidates}/>
      </Route>
      <Route exact path="/bonus">
       <Navbar/>
      <Bonus data={Candidates}/>
      </Route>
      <Route exact path="/payroll">
      <Navbar/>
      <Payroll data={Candidates}/>
      </Route>
      <Route exact path="/hr/:hrId/employees/:empId">
      <Navbar/>
      <EmployeeDetail />
      </Route>
      <Route exact path ="/:empId/create-leave-req">
      <Navbar/>
      <LeaveReq  />
      </Route>
      <Route exact path="/attendance">
      <Navbar/>
      <Attendance data={Candidates}/>
      </Route>
      <Route exact path="/open-attendance">
      <Navbar/>
      <OpenAttendance/>
      </Route>
      <Route exact path="/:empId/allowdeduct">
      <Navbar/>
      <AllowDeduct/>
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