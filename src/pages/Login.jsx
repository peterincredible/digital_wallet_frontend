import { useState } from 'react'
import {useNavigate } from "react-router";
import { Link } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { login} from '../store/Auth';
import store from '../store/store';
import api from "../utility/apiClient";
import { ToastContainer, toast } from 'react-toastify';


function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")  
  const [loading, setLoading] = useState(false)  
  const dispatch = useDispatch();
  let onSubmit= async (e)=>{
     e.preventDefault();
     
    try{
      setLoading(prev=>true)
      if(!email){
        toast.error("email Field is required")
        setLoading(prev=>false)
        return
      }
      if(!password){
        toast.error("Password Field is required")
        setLoading(prev=>false)
        return
      }
      let body = {email,password}
      let response = await api.post('/login',body)
      let auth = JSON.stringify(response.data);
      localStorage.setItem("auth",auth);
      dispatch(login(response.data))
      setLoading(prev=>false)
      /* this will be needed in some part of the code at other places
          let currentState = store.getState();
        
          console.log("is auth is",currentState.auth);
          console.log("is auth ",currentState.auth.token);
      */
      navigate("/")
    }catch(e){
        
        setLoading(prev=>false)
        toast.error(e.response.data.message)
        console.dir(e.response.data.message)
        
    }
    
    
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand"><div className="brand-mark">N</div><div className="brand-name">Nest</div></div>
        <h1>Welcome back</h1>
        <p className="auth-sub">Log in to view your balance and recent activity.</p>
        <form id="loginForm"  onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="log-email">Email address</label>
            <input id="log-email" type="email" 
                   placeholder="you@example.com"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
            />
            <div className="field-error">Enter a valid email address.</div>
          </div>
          <div className="field">
            <label htmlFor="log-pass">Password</label>
            <input id="log-pass" type="password" 
                   placeholder="Your password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="field-error">Enter your password.</div>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>{loading?"Submiting..":"Log in"}</button>
        </form>
        <div className="auth-switch">New to Nest? <Link to="/registration">Create an account</Link></div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login
