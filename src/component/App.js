import React,{useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService} from "../fbase";
function App() {
  const [init,setInit] = useState(false);
  const [userObj,setUserObj]=useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(arg)=>user.updateProfile(arg),
        });
      }
      else{
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);

  const refreshUser=()=>{
    const user=authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(arg)=>user.updateProfile(arg),
    });
  }

  return (
  <>
    {init?<AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}></AppRouter>:"initializing..."}
    <footer>&copy;Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
