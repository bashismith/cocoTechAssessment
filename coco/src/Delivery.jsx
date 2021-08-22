import React from 'react';

const Delivery = (props) => {
  return (
    <div id={props.id} onClick={(e) => console.log(e.target)}>
      <span>Customer: {props.customer}</span>
      <br></br>
      <span>Merchant: {props.merchant}</span>
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