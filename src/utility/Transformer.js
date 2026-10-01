 let transformationFunc=(transaction_detail)=>{
 let date = transaction_detail.transaction.completed_time.split(" ")[0]
 let time = transaction_detail.transaction.completed_time.split(" ")[1]
 let name="";
 if(transaction_detail.transaction_flow ==1){
    name = transaction_detail.transaction.reciever.name;
 }else{
    name = transaction_detail.transaction.transaction_type == 1?"Fund Added Action":transaction_detail.transaction.sender.name;
 }
 let temp = {
    ref:transaction_detail.transaction.refrence_id,
    id:transaction_detail.id,
    // name:transaction_detail.user.name,
    name:name,
    note:transaction_detail.transaction.note,
    amount:parseFloat(transaction_detail.transaction.amount),
    type:transaction_detail.transaction_flow ==1?"out":"in",
    method:transaction_detail.transaction.transaction_type == 1?"TopUp":"P2P",
    status:transaction_detail.transaction.status == 2?"complete":"pending",
    currency_symbol:transaction_detail.transaction.currency.symbol,
    time:time,
    date:date,
    transaction_id:transaction_detail.transaction_id
 }
 return temp;
}

export default transformationFunc;


