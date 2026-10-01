import { useState } from 'react'
import {Routes, Route,useNavigate } from "react-router";
import { Link } from "react-router";
import api from "../utility/apiClient";
import { useDispatch } from 'react-redux';
import { login} from '../store/Auth';
import { ToastContainer, toast } from 'react-toastify';

function Registration() {
  let navigate = useNavigate();
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMisMatch,setPasswordMisMatch]= useState(false)
  const [loading, setLoading] = useState(false) 
  const dispatch = useDispatch();


 
  let onSubmit= async (e)=>{

    try{
      e.preventDefault();
      setLoading(prev=>true)
      if(!firstName){
        toast.error("first name Field required")
        setLoading(prev=>false)
        return;
      }
      if(!lastName){
        toast.error("last name Field required")
        setLoading(prev=>false)
        return;
      }
      if(!email){
        toast.error("email Field required")
        setLoading(prev=>false)
        return;
      }
      
      
      if(password.length < 8 || confirmPassword.length < 8){
        toast.error("password field must be equall or above 8 characters in length")
        setLoading(prev=>false)
        return;
      }
      if(password != confirmPassword){
        toast.error("password and confirm password mismatch")
        setPasswordMisMatch(prevState=>true)
        setLoading(prev=>false)
        return;
      }
      let body = {email,firstName,lastName,password}
      
      let response = await api.post('/register',body)
      console.log("res",response.data)
      let auth = JSON.stringify(response.data);
      localStorage.setItem("auth",auth);
      dispatch(login(response.data))
      setLoading(prev=>false)
      navigate("/")
      
    }catch(e){
        console.log("an error occured in registration page",e)
        toast.error(e.response.data.message)
        setLoading(prev=>false)
    }
    
  }

  return (
   <div className="auth-wrap">
    <div className="auth-card">
      <div className="brand"><div className="brand-mark">N</div><div className="brand-name">Nest</div></div>
      <h1>Create your wallet</h1>
      <p className="auth-sub">Set up an account to start sending, receiving and tracking your money.</p>
      <form id="registerForm"  onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="first-name">First name</label>
          <input id="first-name" type="text" 
                 placeholder="Jordan"
                 value={firstName}
                 onChange={(e)=>setFirstName(e.target.value)}
            />
          <div className="field-error">Enter your first name.</div>
        </div>
        <div className="field">
          <label htmlFor="last-name">Last name</label>
          <input id="last-name" type="text" 
                 placeholder="Ade"
                 value={lastName}
                 onChange={(e)=>setLastName(e.target.value)}
          />
          <div className="field-error">Enter your Last name.</div>
        </div>
        <div className="field">
          <label htmlFor="reg-email">Email address</label>
          <input id="reg-email" type="email" 
                 placeholder="you@example.com"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
            />
          <div className="field-error">Enter a valid email address.</div>
        </div>
        <div className="field">
          <label htmlFor="reg-pass">Password</label>
          <input id="reg-pass" type="password" 
                 placeholder="At least 8 characters"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
          />
          <div className="field-error">Password must be at least 8 characters.</div>
        </div>
        <div className="field">
          <label htmlFor="reg-pass2">Confirm password</label>
          <input id="reg-pass2" type="password" 
                 placeholder="Re-enter your password"
                 value={confirmPassword}
                 onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          
          {passwordMisMatch && <div  className="field-error" style={{display:"block"}}>Passwords don't match.</div>}
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>{loading?"submitting...":"Create account"}</button>
      </form>
      <div className="auth-switch">Already have a wallet? <Link to="/login">Log in</Link></div>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default Registration