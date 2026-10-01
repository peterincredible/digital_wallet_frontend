import { useState,useEffect,useRef } from 'react'
import {Routes, Route,useParams } from "react-router";
import { Link } from "react-router";
import Wrapper from '../components/Wrapper';
import Sidebar from '../components/Sidebar';
import api from "../utility/apiClient";
import transformationFunc from "../utility/Transformer";

function TransactionDetail() {
const [transaction, setTransaction] = useState(null)
let params = useParams();
let t = {type:"in",amount:450.00,status:"",name:"Amara Okoye",date:"Sep 26, 2026",time:"09:14 AM",note:"Rent split"}
const icon = t => t === "in" ? "↓" : "↑";
// const fmt = n => "$" + n.toFixed(2);
const fmt = n => n.currency.symbol + n.amount.toFixed(2);
// let detail_icon = icon(t.type)
// let amount = fmt(t)
const { id } = useParams();
const hasFetched = useRef(false);

const fetchData = async () => {
      try {
            let response = await api.get('/transactions/get/'+id)
            let trans_data = transformationFunc(response.data);
            console.log("transaction initiated",trans_data)
            setTransaction(prev=>trans_data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

useEffect(()=>{
    if (hasFetched.current) return;
        hasFetched.current = true;

        fetchData();
},[])


  return (
   <Wrapper>
        <Sidebar />
        <div className="main">
            <div className="main-inner">
                <Link className="back-link" to="/">← Back to dashboard</Link>
                <div className="page-head">
                     <h2>Transaction details</h2>
                     <p>A full record of this payment.</p>
                </div>
                <div id="detail">
                        { transaction && <div className="detail-card">
                            <div className="detail-hero">
                                <div className="detail-icon">{icon(t.type)}</div>
                                <div className={"detail-amount "+ transaction.type}> {icon(transaction.type)} {transaction.amount}</div>
                                <div className="detail-name"> {transaction.type === "in" ? "From" : "To"} {transaction.name}</div>
                                <span className={"status-pill "+transaction.status}>{transaction.status}</span>
                            </div>
                            <div className="detail-list">
                                <div className="detail-row"><span className="k">Description</span><span className="v">{transaction.note}</span></div>
                                <div className="detail-row"><span className="k">Type</span><span className="v"> {transaction.type === "in" ? "Received" : "Sent"}</span></div>
                                <div className="detail-row"><span className="k">Date</span><span className="v"> {transaction.date}</span></div>
                                <div className="detail-row"><span className="k">Time</span><span className="v"> {transaction.time}</span></div>
                                
                                {/* <div className="detail-row"><span className="k">Method</span><span className="v"> {t.method}</span></div> */}
                                {/* <div className="detail-row"><span className="k">Reference</span><span className="v">{t.ref}</span></div> */}
                            </div>
                            <div className="detail-actions">
                                <Link className="chip-btn" to="/transaction-history">Back</Link>
                                {/* <button className="chip-btn primary" onclick="window.print()">Download receipt</button> */}
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default TransactionDetail