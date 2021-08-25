import React, {useState} from 'react';
import { Merchant } from './TypesAndInterfaces';



const Merchants = (props: Merchant) => {
  const [merchBtn, setMerch] = useState<number>(0);

  const expandMerchantInfo = () => {
    merchBtn === 0 ? setMerch(1) : setMerch(0)
  }

  return(
    <div id="merchant">
      <span>Merchant: {props.name}<button style={{'marginLeft': '5px'}} onClick={expandMerchantInfo}>Info</button></span>
      {(merchBtn === 0) ? '': <ul><li>Merchant ID: {props.id}</li><li>Merchant address: {props.address}</li></ul>}
      <br></br>
  </div>
    )
};

export default Merchants;