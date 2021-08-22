import React, {useState, useEffect, useRef }from 'react';
import Delivery from './Delivery';

const DeliveriesContainer = () => {
  const [apiData, setApiData] = useState({});
  const renderCount = useRef(1);
  //console.log(renderCount)

  const apiCall = () => {
    fetch('https://frontend-project-dot-cyan-dev.uc.r.appspot.com/deliveries')
    .then(response => response.json())
    .then(response => {
      setApiData(response.data)
    })
  };

  useEffect(()=>{
    if(renderCount.current === 1){
      apiCall();
      renderCount.current = renderCount.current + 1;
    }
    setInterval(() => {
      console.log('refreshed')
      apiCall();
    },10000)
  },[]);

  const deliveries = [];

  for(let i = 0; i < apiData.length; i++){
    //console.log('trying to get trip',apiData[0].trip.robot)
    deliveries.push(<Delivery key={i} id={i} customer={apiData[i].customer.name} merchant={apiData[i].merchant.name} stage={apiData[i].stage} robot={i} />)
  }



  //console.log('apiData',apiData)
  return (
    <div id="container">
      <h1>Container</h1>
      {deliveries}
    </div>
    );
};

export default DeliveriesContainer;