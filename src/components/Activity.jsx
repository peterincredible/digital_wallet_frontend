import { useState,useEffect } from 'react'
import {Routes, Route } from "react-router";
import { Link } from "react-router";
// function Activity({amount}) {
 
//   useEffect(()=>{
//     console.log("it was triggered activity hippy")
//   })
//   return (
//     <div className="txn-row">
//         <div className="txn-icon">{amount}</div>
//         <div className="txn-info">
//             <div className="txn-name">{amount}</div>
//             <div className="txn-meta">{amount}</div>
//         </div>
//         <div className=""> {amount}</div>
//     </div>
//   )
// }

function Activity({name,note,type,amount,date,id,symbol,transaction_id}) {
  
  const icon = t => t === "in" ? "↓" : "↑";
  const fmt = n => symbol + n.toFixed(2);
  const cl_name = "txn-amount " + type
  const sign = type === "in" ? "+" : "-"
  const amt = fmt(amount)
  const txn_mta = note + ' . '+date
  const icn = icon(type)
  const to  = "/transaction-detail/"+id
  useEffect(()=>{
    console.log("it was triggered activity hippy")
  },[])
  return (
    <Link className="txn-row" to={to}>
        <div className="txn-icon">{icn}</div>
        <div className="txn-info">
            <div className="txn-name">{name}</div>
            <div className="txn-meta">{txn_mta}</div>
        </div>
        <div className={cl_name}>{sign} {amt}</div>
        <div className="txn-chev">›</div>
    </Link>
    // <div className="txn-row">
    //     <div className="txn-icon">{icn}</div>
    //     <div className="txn-info">
    //     <div className="txn-name">{name}</div>
    //     <div className="txn-meta">{txn_mta}</div>
    //     </div>
    //     <div className={cl_name}> {sign} ${amt}</div>
    // </div>
  )
}

export default Activity