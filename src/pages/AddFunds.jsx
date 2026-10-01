import { useState,useEffect,useRef } from 'react'
import {Routes, Route,useNavigate } from "react-router";
import { Link } from "react-router";
import Wrapper from '../components/Wrapper';
import Sidebar from '../components/Sidebar';
import api from "../utility/apiClient";
import { ToastContainer, toast } from 'react-toastify';

function AddFunds() {
  const [currentTab, setCurrentTab] = useState("USD")
  const [amount, setAmount] = useState(0.00)
  const[transaction_id,setTransactionId] = useState(0);
  const hasFetched = useRef(false);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false)  
 
  
  let submitAddFund=async ()=>{
    let currency_id = 0;
     if(currentTab =="USD"){
        currency_id = 2
    }else if(currentTab =="NGN"){
       currency_id = 1
    }else{
            currency_id = 3
    }
    setLoading(prev=>true)
    try {
            if(!amount){
                toast.error("amount Field cant be emptys")
                setLoading(prev=>false)
                return;
            }
            let body = {amount,currency_id,transaction_id}
            console.log("body is =>",body);
            // throw Error("user generated error");
            let response = await api.post('/wallets/addFund',body)
            toast.success("funds successfully added")
            setLoading(prev=>false)
            navigate("/")
            // console.log(response);
      } catch (error) {
        //  console.dir(error);
         toast.error(error.response.data.message)
        //  console.error('Error fetching data:', error);
        setLoading(prev=>false)
      }

  }
  let setTab=(tab)=> setCurrentTab((prev)=>tab)

  let checkTab=()=>{
    if(currentTab =="USD"){
        return "$"
    }
    if(currentTab =="NGN"){
        return "₦"
    }
    return "₮"

  }///transactions/init
  const fetchData = async () => {
      try {
            let response = await api.post('/transactions/init')
            console.log("transaction initiated",response.data)
            setTransactionId(prev=>response.data.id)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  useEffect(()=>{
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchData();
    
    
},[])
//   useEffect(()=>{
//     console.log("current Tab changed mounted",currentTab)
//     if(currentTab =="USD"){
//         setMaxAmount(wallet.usd_amount)
//     }else if(currentTab =="NGN"){
//         setMaxAmount(wallet.ngn_amount)
//     }else{
//         setMaxAmount(wallet.usdt_amount)
//     }
    

//   },[currentTab])
  
  /*
   const fetchData = async () => {
      try {
            let response = await api.get('/wallets/user_wallet')
            setWallet(prevWallet=>{
            let newState= {
            
            ngn_amount:response.data.ngn_amount,
            usd_amount:response.data.usd_amount,
            usdt_amount:response.data.usdt_amount
            }
            return newState
        })
        console.log(response.data)

        // const result = await response.json();
        // setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   const [wallet, setWallet] = useState({ngn_amount:0.00,usd_amount:0.00,usdt_amount:0.00})
   const [maxAmount, setMaxAmount] = useState(0.00)
  // this will be needed in the wallet to wallet transfer funds
  useEffect(()=>{
    console.log("addfunds mounted")
    fetchData()
    
  },[])
  useEffect(()=>{
    console.log("current Tab changed mounted",currentTab)
    if(currentTab =="USD"){
        setMaxAmount(wallet.usd_amount)
    }else if(currentTab =="NGN"){
        setMaxAmount(wallet.ngn_amount)
    }else{
        setMaxAmount(wallet.usdt_amount)
    }
    

  },[currentTab])

  */

  return (
   <Wrapper>
        <Sidebar />
        <div className="main">
            <div className="main-inner">
                <Link className="back-link" to="/">← Back to dashboard</Link>
                <div className="page-head">
                    <h2>Add funds</h2>
                    <p>Top up any of your wallets in a few steps.</p>
                </div>
                <div className="fund-card" id="fundForm">
                    <span className="fund-label">Choose wallet</span>
                    <div className="cur-tabs">
                        <button className={currentTab =="USD"? "cur-tab active":"cur-tab"} data-cur="USD" onClick={()=>{setTab("USD")}}>USD</button>
                        <button className={currentTab =="NGN"? "cur-tab active":"cur-tab"} data-cur="NGN" onClick={()=>{setTab("NGN")}}>NGN</button>
                        <button className={currentTab =="USDT"? "cur-tab active":"cur-tab"} data-cur="USDT" onClick={()=>{setTab("USDT")}}>USDT</button>
                    </div>

                    {/* <span className="fund-label">Amount (<b>Max:</b>{checkTab()}{maxAmount})</span> */}
                    <span className="fund-label">Amount</span>
                    <div className="amount-input">
                        <span id="curSymbol">{checkTab()}</span>
                        <input id="amount" type="number" min="0" step="0.01" 
                               placeholder="0.00" value={amount}
                               onChange={(e)=>setAmount(e.target.value)}
                        />
                    </div>
                    <div className="field-error" id="amountError">Enter an amount greater than zero.</div>
                    <div className="quick-row" id="quickRow"></div>

                    {/* <span className="fund-label">Payment method</span>
                    <div className="method-list" id="methodList"></div>

                    <div className="deposit-box hidden-box" id="depositBox" style={{display:"none"}}>
                        Send only USDT (TRC20) to this address:<br/>
                        <b>TXk9...demo-address-7Qp2</b><br/>
                        Deposits are credited after network confirmation.
                    </div>

                    <div className="fund-summary"><span>Fee</span><b id="fee">0.00</b></div>
                    <div className="fund-summary" style={{marginBottom:"20px"}}><span>You'll receive</span><b id="receive">0.00</b></div> */}

                    <button className="btn-primary" id="fundBtn" onClick={submitAddFund} disabled={loading}>{loading?"submitting...":"Add funds"}</button>
                </div>

                    {/* <div className="fund-card" id="fundSuccess" style={{display:"none"}}>
                        <div className="success-box">
                        <div className="tick">✓</div>
                        <h3>Funds request submitted</h3>
                        <p id="successMsg"></p>
                        <a className="chip-btn primary" href="dashboard.html">Back to dashboard</a>
                        </div>
                    </div> */}
                </div>
        </div>
        <ToastContainer/>
    </Wrapper>
  )
}

export default AddFunds