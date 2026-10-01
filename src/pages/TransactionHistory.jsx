import { useState,useRef,useEffect  } from 'react'
import {Routes, Route } from "react-router";
import { Link } from "react-router";
import Wrapper from '../components/Wrapper';
import Sidebar from '../components/Sidebar';
import Activity from "../components/Activity"
import api from "../utility/apiClient";
import store from '../store/store';
import transformationFunc from "../utility/Transformer";

function TransactionHistory() {
  const hasFetched = useRef(false);
  let transactions_temp  = [
  {id:1, name:"Amara Okoye", note:"Rent split", type:"in",  amount:450.00, date:"Sep 26, 2026", time:"09:14 AM", method:"Wallet transfer", status:"Completed", ref:"NST-482910"},
  {id:2, name:"Netflix",     note:"Subscription", type:"out", amount:15.99, date:"Sep 25, 2026", time:"06:02 PM", method:"Card payment", status:"Completed", ref:"NST-482731"},
  {id:3, name:"Tunde B.",    note:"Freelance payment", type:"in", amount:820.00, date:"Sep 24, 2026", time:"11:40 AM", method:"Bank transfer", status:"Completed", ref:"NST-482544"},
  {id:4, name:"Shoprite",    note:"Groceries", type:"out", amount:63.40, date:"Sep 23, 2026", time:"04:25 PM", method:"Card payment", status:"Completed", ref:"NST-482310"},
  {id:5, name:"David Eze",   note:"Dinner split", type:"out", amount:22.00, date:"Sep 21, 2026", time:"08:51 PM", method:"Wallet transfer", status:"Pending", ref:"NST-481977"},
  {id:6, name:"Payroll — Lumen Ltd", note:"Salary", type:"in", amount:1650.00, date:"Sep 18, 2026", time:"07:00 AM", method:"Bank transfer", status:"Completed", ref:"NST-481402"},
  {id:7, name:"Uber",        note:"Ride", type:"out", amount:11.75, date:"Sep 17, 2026", time:"10:33 PM", method:"Card payment", status:"Completed", ref:"NST-481215"},
  {id:8, name:"Chidinma A.", note:"Gift received", type:"in", amount:50.00, date:"Sep 15, 2026", time:"01:12 PM", method:"Wallet transfer", status:"Failed", ref:"NST-480863"},
];
const [transactions, setTransaction] = useState([])
const [filterBy, setFilterBy] = useState("all")

   const fetchData = async () => {
      try {
       
       
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
    fetchData()
    //"/wallets/user_wallet"
    let currentState = store.getState();
   
    if(!currentState.auth.user){
        navigate("/login")
    }
  },[])

  return (
      <Wrapper>
        <Sidebar />
         <div className="main">
            <div className="main-inner">
                <Link className="back-link" to="/">← Back to dashboard</Link>
                <div className="page-head">
                    <h2>Transaction history</h2>
                    <p>Every transfer, deposit and payment on your wallet.</p>
                </div>
                {/* <div className="filters">
                  <button className={filterBy== "all"?"filter-btn active":"filter-btn"} data-filter="all" onClick={()=>setFilterBy("all")}>All</button>
                  <button className={filterBy== "in"?"filter-btn active":"filter-btn"} data-filter="in" onClick={()=>setFilterBy("in")}>Received</button>
                  <button className={filterBy== "out"?"filter-btn active":"filter-btn"} data-filter="out" onClick={()=>setFilterBy("out")}>Sent</button>
                </div> */}
                <div className="txn-list" id="fullHistory">
                  {
                        transactions.map((t,i)=><Activity key={i+1} id={t.id} name={t.name} amount={t.amount} 
                                                      date={t.date} type={t.type} note={t.note} symbol={t.currency_symbol}
                                                      transaction_id={t.transaction_id}
                                            />
                                        )
                    }
                </div>
            </div>
          </div>
      </Wrapper>
  )
}

export default TransactionHistory