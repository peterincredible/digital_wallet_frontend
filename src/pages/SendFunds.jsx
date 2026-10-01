import { useState,useEffect,useRef } from 'react'
import {Routes, Route,useNavigate } from "react-router";
import { Link } from "react-router";
import Wrapper from '../components/Wrapper';
import Sidebar from '../components/Sidebar';
import api from "../utility/apiClient";
import {useDebounce} from "react-use"
import { ToastContainer, toast } from 'react-toastify';

function SendFunds() {
  const [currentTab, setCurrentTab] = useState("USD")
  const [amount, setAmount] = useState(0.00)
  const hasFetched = useRef(false);
  let navigate = useNavigate();
  const [wallet, setWallet] = useState({ngn_amount:0.00,usd_amount:0.00,usdt_amount:0.00})
  const [maxAmount, setMaxAmount] = useState(0.00)
  const [recieverEmail,setRecieverEmail]=useState("")
  const[transaction_id,setTransactionId] = useState(0);
  const [loading, setLoading] = useState(false)  
//   const [debouncedValue, setDebouncedValue] = useState(null);

//   const [, checkEmail] = useDebounce(
//     async () => {
//       setState('Typing stopped');
//       setDebouncedValue(val);
//     },
//     2000,
//     [recieverEmail]
//   );
 
  
  let submitSendFund=async ()=>{
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
            let email_body = {email:recieverEmail}
            let email_check_response= await api.post('/transactions/checkMail',email_body);
            let reciever_id = email_check_response.data.id
            if(!reciever_id){
                toast.error("user with email address not in our system")
                setLoading(prev=>false)
                return;
            }
            // console.log(email_check_response.data.id)
            // console.log(transaction_id,currency_id,amount)
            
            /** */
            let body = {amount,currency_id,transaction_id,reciever_id}
            // console.log("body is =>",body);
            let response = await api.post('/transactions/sendFund',body)
            toast.success("Funds Transferred successfully")
            setLoading(prev=>false)
            navigate("/")
           /**/
      } catch (error) {
         console.dir(error);
         setLoading(prev=>false)
         console.error('Error fetching data:', error);
         toast.error(error.response.data.message)
      }

  }
  let setTab=(tab)=> setCurrentTab((prev)=>tab)
  let checkInputAmount = (e)=>{
        let value = parseFloat(e.target.value);
        // if(isNaN(value)) value=0;
        if(value > maxAmount){
            value=maxAmount
        }
        setAmount(value);
  }
  

  let checkTab=()=>{
    if(currentTab =="USD"){
        return "$"
    }
    if(currentTab =="NGN"){
        return "₦"
    }
    return "₮"

  }
  
  
const fetchData = async () => {
      try {
            let response = await api.get('/wallets/user_wallet')
            // console.log("response is ",response.data.wallet)
            setWallet(prevWallet=>{
            let newState= {
            
            ngn_amount:parseFloat(response.data.wallet.ngn_amount),
            usd_amount:parseFloat(response.data.wallet.usd_amount),
            usdt_amount:parseFloat(response.data.wallet.usdt_amount)
            }
            // console.log("new state is",newState)
            return newState
        })
        let response2 = await api.post('/transactions/init')
        setTransactionId(prev=>response2.data.id)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
  // this will be needed in the wallet to wallet transfer funds
  useEffect(()=>{
    if (hasFetched.current) return;
        hasFetched.current = true;
    // console.log("addfunds mounted")
    fetchData()
    
  },[])
  useEffect(()=>{
    // console.log("current Tab changed mounted",currentTab)
    // console.log("current tab changed ",wallet)
    setAmount(0)
    if(currentTab =="USD"){
        
        setMaxAmount(wallet.usd_amount)
    }else if(currentTab =="NGN"){
        setMaxAmount(wallet.ngn_amount)
    }else{
        setMaxAmount(wallet.usdt_amount)
    }
    
    

  },[currentTab])

  

  return (
   <Wrapper>
        <Sidebar />
        <div className="main">
            <div className="main-inner">
                <Link className="back-link" to="/">← Back to dashboard</Link>
                <div className="page-head">
                    <h2>Send funds</h2>
                    <p>Top up any of your wallets in a few steps.</p>
                </div>
                <div className="fund-card" id="fundForm">
                    <span className="fund-label">Choose wallet</span>
                    <div className="cur-tabs">
                        <button className={currentTab =="USD"? "cur-tab active":"cur-tab"} data-cur="USD" onClick={()=>{setTab("USD")}}>USD</button>
                        <button className={currentTab =="NGN"? "cur-tab active":"cur-tab"} data-cur="NGN" onClick={()=>{setTab("NGN")}}>NGN</button>
                        <button className={currentTab =="USDT"? "cur-tab active":"cur-tab"} data-cur="USDT" onClick={()=>{setTab("USDT")}}>USDT</button>
                    </div>
                    <span className="fund-label">Sender Email</span>
                    {/* <span className="fund-label">Amount</span> */}
                    <div className="amount-input">
                        <span id="curSymbol">✉</span>
                        <input  type="text" 
                               placeholder="jonDoe@exmple.com" 
                               onChange={e=>{setRecieverEmail(e.target.value)}}
                            //    onChange={(e)=>setAmount(e.target.value)}
                                //   onChange={checkInputAmount}
                        />
                    </div>
                    <span className="fund-label">Amount (<b>Max:</b>{checkTab()}{maxAmount})</span>
                    {/* <span className="fund-label">Amount</span> */}
                    <div className="amount-input">
                        <span id="curSymbol">{checkTab()}</span>
                        <input id="amount" type="number" min="0" step="0.01" 
                               placeholder="0.00" value={amount}
                            //    onChange={(e)=>setAmount(e.target.value)}
                                  onChange={checkInputAmount}
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

                    <button className="btn-primary" id="fundBtn" onClick={submitSendFund}>Send funds</button>
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

export default SendFunds