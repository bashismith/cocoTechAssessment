import React, {useState, useEffect, useRef } from 'react';
import Delivery from './Delivery';
//import Customers from './Customers'


const DeliveriesContainer = () => {
  const [apiData, setApiData] = useState<any>({});
  const renderCount = useRef<number>(1);


  const apiCall = () => {
    fetch('https://frontend-project-dot-cyan-dev.uc.r.appspot.com/deliveries')
    .then(response => response.json())
    .then(response => {
      setApiData(response.data)
    })
  };

  useEffect(()=>{
    //on first load call the api
    if(renderCount.current === 1){
      apiCall();
      renderCount.current = renderCount.current + 1;
    }
    //every 10 seconds fetch for the updated data
    setInterval(() => {
      console.log('10 seconds')
      apiCall();
    },10000)
  },[]);

  const deliveries:Array<any>= [];

  //functions for distance between the customer and merhcant
  function deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }
  function getDistanceFromLatLon(lat1:number, lon1:number, lat2:number, lon2:number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    // converted to miles by multiplying km by 0.6214
    //round the number up for better readablility
    return Math.ceil(d * 0.6214) + ' mile(s)';
  }
  //function for the running time
  function timeElapsed(startTime:number){
    const today = new Date();
    let currentTime:any = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    currentTime = currentTime.replace(/\D+/g, '');
    //return the current time in hr,min,sec minus the startTime
    //console.log('current time: ', currentTime, 'start time: ', startTime);
    let diff:any = Math.abs(currentTime - startTime);
    diff = diff.toString();
    return `${diff[0]} hrs ${diff[1]}${diff[2]} minutes ${diff[3]}${diff[4]} seconds`
  };
  //function for if robot issue is null it will display no issues
  function robotIssue(issue:string){
    return issue ? issue : 'No Issues';
  }
  for(let i in apiData){
    let createdTime = apiData[i].created_at.replace(/\D+/g, '').slice(6);
    //coordinates of customers and merchants
    let cLat = apiData[i].customer.location[0];
    let cLon = apiData[i].customer.location[1];
    let mLat = apiData[i].merchant.location[0];
    let mLon = apiData[i].merchant.location[1];
    //trip is null when the delivery is still at merchant so robot is yet to be assigned
    if(apiData[i].trip){
      //robot issue string
      let rbtIs = apiData[i].trip.robot[0].issue;
      deliveries.push(<Delivery key={i} id={apiData[i].customer.id} customer={apiData[i].customer.name} merchant={apiData[i].merchant.name} merchantId={apiData[i].merchant.id} distance={getDistanceFromLatLon(cLat,cLon,mLat,mLon)} time={timeElapsed(createdTime)} stage={apiData[i].stage} robotName={apiData[i].trip.robot[0].name} robotId={apiData[i].trip.robot[0].id} robotIssue={robotIssue(rbtIs)}cusAddress={apiData[i].customer.address} cusPhone={apiData[i].customer.phone_number} merchAddress={apiData[i].merchant.address} merchPhone={apiData[i].merchant.phone_number}/>)
    }else {
      deliveries.push(<Delivery key={i} id={apiData[i].customer.id} customer={apiData[i].customer.name} merchant={apiData[i].merchant.name}  merchantId={apiData[i].merchant.id}  distance={getDistanceFromLatLon(cLat,cLon,mLat,mLon)} time={timeElapsed(createdTime)} stage={apiData[i].stage} robot='UNASSIGNED' cusAddress={apiData[i].customer.address} cusPhone={apiData[i].customer.phone_number} merchAddress={apiData[i].merchant.address} />)
    }
  }

  return (
    <div id="container">
      <h1>Coco Deliveries</h1>
      {deliveries}
    </div>
    );
};

export default DeliveriesContainer;