import {useState,useEffect } from 'react'
import { NavLink,useNavigate } from "react-router";
import { logout } from '../store/Auth';
import { useDispatch } from 'react-redux';
import api from "../utility/apiClient";


function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let onLogout = async (e)=>{

    try{
        e.preventDefault();      
        let response = await api.post('/logout')
        console.log("res",response.data)
        dispatch(logout())
        localStorage.removeItem('auth')
        navigate("/login")
        /* this will be needed in some part of the code at other places
                    let currentState = store.getState();
                
                    console.log("is auth is",currentState.auth);
                    console.log("is auth ",currentState.auth.token);
        */
    }catch(e){
        console.log("an error occured in registration page",e)
    }       
  }
  

  return (

    
       <div className="sidebar">
            <div className="brand">
                <div className="brand-mark">N</div>
                <div className="brand-name">Nest</div>
            </div>
            <NavLink className="nav-item active" to="/">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
                    Dashboard
            </NavLink>
            <NavLink className="nav-item" to="/transaction-history">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>
                Transaction history
            </NavLink>
            <NavLink className="nav-item" to="/add-funds">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
                Add Funds
            </NavLink>
            <NavLink className="nav-item" to="/send-funds">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
                Send Funds
            </NavLink>
            
            
            <div className="sidebar-foot"><a className="logout" href="" onClick={onLogout}>Log out</a></div>
       </div>
     
  )
}

export default Sidebar