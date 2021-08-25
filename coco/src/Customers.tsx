import React, {useState} from 'react';
import { Customer } from './TypesAndInterfaces';



const Customers = (props: Customer) => {
  const [custBtn, setCust] = useState<number>(0);

  const expandCustomerInfo = () => {
    custBtn === 0 ? setCust(1) : setCust(0)
  }

  return(
    <div id="customer">
    <span>Customer: {props.name}<button style={{'marginLeft': '5px'}} onClick={expandCustomerInfo}>Info</button></span>
      {(custBtn === 0) ? '': <ul><li>Customer ID: {props.id}</li><li>Customer address: {props.address}</li><li>Customer Phone Number: {props.phone_number}</li></ul>}
      <br></br>
  </div>
    )
};

export default Customers;