import React from 'react';
import Customers from './Customers';
import Merchants from './Merchants';
import Robots from './Robots';


const Delivery = (props:any) => {
  return (
    <div id={props.id} >
      <Customers id={props.id} name={props.customer} phone_number={props.cusPhone} address={props.cusAddress} />
      <Merchants id={props.merchantId} address={props.merchAddress} name={props.merchant} />
      <span>Distance: {props.distance}</span>
      <br></br>
      <span>Running Time Of Delivery: {props.time}</span>
      <br></br>
      <span>Stage: {props.stage}</span>
      <br></br>
      <Robots id={props.robotId} name={props.robotName} issue={props.robotIssue}/>
      <br></br>
    </div>
    );
};


export default Delivery;