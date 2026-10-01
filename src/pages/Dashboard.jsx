import {  useState,useEffect,useRef } from 'react'
import {Routes, Route,useNavigate,useParams  } from "react-router";
import { Link } from "react-router";
import Wrapper from '../components/Wrapper';
import Sidebar from '../components/Sidebar';
import Activity from "../components/Activity"
import store from '../store/store';
import api from "../utility/apiClient";
import transformationFunc from "../utility/Transformer";

function Dashboard() {

                                        
  const [wallet, setWallet] = useState({ngn_amount:0.00,usd_amount:0.00,usdt_amount:0.00})
  const [transactions, setTransaction] = useState([])
  const hasFetched = useRef(false);
  let navigate = useNavigate();
   const fetchData = async () => {
      try {
        let response = await api.get('/wallets/user_wallet')
        console.log("responded data =>",response.data.wallet)
        setWallet(prevWallet=>{
            let newState= {
            
            ngn_amount:response.data.wallet.ngn_amount,
            usd_amount:response.data.wallet.usd_amount,
            usdt_amount:response.data.wallet.usdt_amount
            }
            console.log("new data is ",newState)
            return newState
        })
        let response2 = await api.get("/transactions/getTransactionDetails");
        let transformaion_data = response2.data.data;
        console.log("response2 data",response2.data.data);
        transformaion_data =transformaion_data.map(transformationFunc)
        setTransaction(transformaion_data)

        
        

        // const result = await response.json();
        // setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(()=>{
    
    if (hasFetched.current) return;
        hasFetched.current = true;
    console.log("dashboard mounted")
    fetchData()
    //"/wallets/user_wallet"
    let currentState = store.getState();
   
    if(!currentState.auth.user){
        navigate("/login")
    }  
                // console.log("is auth is",currentState.auth);
                // console.log("is auth ",currentState.auth.token);
  },[])

  return (
    <Wrapper>
        <Sidebar />
        <div className="main">
            <div className="main-inner">
                <div className="page-head">
                    <h2 id="greeting">Welcome back</h2>
                    <p>Here's what's happening with your wallet today.</p>
                </div>

                {/* <div className="balance-card">
                    <div className="balance-label">Available balance</div>
                    <div className="balance-amount">$4,286.50</div>
                    <div className="balance-actions">
                    <button className="chip-btn primary">Send money</button>
                    <button className="chip-btn">Add funds</button>
                    <button className="chip-btn">Request</button>
                    </div>
                </div> */}
                <div className="currency-row">
                    <div className="currency-card">
                        <div className="cc-top"><span className="cc-tag">USD</span><span className="cc-name">Dollar</span></div>
                        <div className="cc-amount">${wallet.usd_amount?wallet.usd_amount: 0.00}</div>
                    </div>
                    <div className="currency-card">
                        <div className="cc-top"><span className="cc-tag">NGN</span><span className="cc-name">Naira</span></div>
                        <div className="cc-amount">₦{wallet.ngn_amount?wallet.ngn_amount : 0.00 }</div>
                    </div>
                    <div className="currency-card">
                        <div className="cc-top"><span className="cc-tag">USDT</span><span className="cc-name">Tether</span></div>
                        <div className="cc-amount">₮{wallet.usdt_amount?wallet.usdt_amount:0.00}</div>
                    </div>
                </div>

                {/* <div className="stat-row">
                    <div className="stat-card"><div className="label">Received this month</div><div className="value mint">+$1,920.00</div></div>
                    <div className="stat-card"><div className="label">Spent this month</div><div className="value rust">-$742.30</div></div>
                </div> */}

                <div className="section-title">
                    <h3>Recent activity</h3>
                    <Link className="link-btn" to="/transaction-history">View all</Link>
                </div>
                <div className="txn-list" id="dashRecent">
                    {
                        transactions.map((t,i)=><Activity key={i+1} id={t.id} name={t.name} amount={t.amount} 
                                                      date={t.date} type={t.type} note={t.note} symbol={t.currency_symbol}
                                                      transaction_id={t.transaction_id}
                                            
                                            />
                                        )
                    }
                    
                     {/* {temp} */}
                </div>
            </div>
        </div>
    </Wrapper> 
  )
}

export default Dashboard
