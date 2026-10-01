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
  
const [transactions, setTransaction] = useState([])
// const [filterBy, setFilterBy] = useState("all")

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