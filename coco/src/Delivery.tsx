import React, {useState} from 'react';

const Delivery= (props:any) => {
  const [custBtn, setCust] = useState<number>(0);
  const [merchBtn, setMerch] = useState<number>(0);
  const expandCustomerInfo = () => {
    custBtn === 0 ? setCust(1) : setCust(0)
  }
  const expandMerchantInfo = () => {
    merchBtn === 0 ? setMerch(1) : setMerch(0)
  }



  return (
    <div id={props.id} >
      <span id="customer">Customer: {props.customer}<button style={{'marginLeft': '5px'}} onClick={expandCustomerInfo}>Info</button></span>
      {(custBtn === 0) ? '': <ul><li>Customer address: {props.cusAddress}</li><li>Customer Phone Number: {props.cusPhone}</li></ul>}
      <br></br>
      <span id="merchant">Merchant: {props.merchant}<button style={{'marginLeft': '5px'}} onClick={expandMerchantInfo}>Info</button></span>
      {(merchBtn === 0) ? '': <ul><li>Merchant address: {props.merchAddress}</li></ul>}
      <br></br>
      <span>Distance: {props.distance}</span>
      <br></br>
      <span>Running Time Of Delivery: {props.time}</span>
      <br></br>
      <span>Stage: {props.stage}</span>
      <br></br>
      <span>Robot: {props.robot}</span>
      <br></br>
      <br></br>
    </div>
    );
};


export default Delivery;