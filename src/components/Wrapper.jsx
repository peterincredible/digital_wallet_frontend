import { Children, useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login} from '../store/Auth';
import store from '../store/store';


function Wrapper({children}) {
  const dispatch = useDispatch();
  useEffect(()=>{
      let currentState = store.getState();
      let localStorageState  = localStorage.getItem('auth')
      // console.log("wraspper mounted local storage is ",localStorageState)
      if(!currentState.auth.user && localStorageState){
        
         let auth = JSON.parse(localStorageState);
          // console.log("it hit here wrapper line 17",auth)
         dispatch(login(auth))
      }
      currentState = store.getState();
      // console.log("is auth is now",currentState.auth);
      // console.log("is auth now",currentState.auth.token);
  },[])
  

  return (

     <div className="shell">
            {children}
     </div>
  )
}

export default Wrapper