import React, {useState, useEffect, useRef }from 'react';
import Delivery from './Delivery';

const DeliveriesContainer = () => {


  type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    };

    type Coordinate = [number, number];
    enum RobotIssue {
    LOW_BATTERY = "low_battery",
    SW_ISSUE = "sw_issue",
    HW_ISSUE = "hw_issue",
    FLIPPED = "flipped",
    IMMOBILE = "immobile",
    }

    interface Robot {
    id: string;
    name: string;
    issue: RobotIssue;
    }

    enum TripStatus {
    ACTIVE = "active",
    STALLED = "stalled",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
    }

    interface Trip {
    id: string;
    created_at: Date;
    updated_at: Date;
    source: Coordinate;
    destination: Coordinate;
    location: Coordinate;
    status: TripStatus;
    robot: Robot;
    }

    interface Merchant {
    id: string;
    name: string;
    location: Coordinate;
    address: string;
    }

    interface Customer {
    id: string;
    name: string;
    phone_number: string;
    location: Coordinate;
    address: string;
    }

    enum DeliveryStage {
    AT_MX = "at_merchant",
    ON_TRIP = "on_trip",
    AT_CX = "at_customer",
    }

    interface Delivery {
    id: string;
    created_at: Date;
    stage: DeliveryStage;
    merchant: Merchant;
    customer: Customer;
    trip: Trip;
    }

    enum UserRole {
    DISPATCH = "dispatch",
    FIELD_OP = "field_op",
    }

    interface User {
    id: string;
    name: string;
    role: UserRole;
    username: string;
    phone_no: string;
    }

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
    if(renderCount.current === 1){
      apiCall();
      renderCount.current = renderCount.current + 1;
    }
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

  for(let i in apiData){
    let createdTime = apiData[i].created_at.replace(/\D+/g, '').slice(6);
    //coordinates of customers and merchants
    let cLat = apiData[i].customer.location[0];
    let cLon = apiData[i].customer.location[1];
    let mLat = apiData[i].merchant.location[0];
    let mLon = apiData[i].merchant.location[1];
    //trip is null when the delivery is still at merchant so robot is yet to be assigned
    if(apiData[i].trip){
      deliveries.push(<Delivery key={i} id={apiData[i].customer.i} customer={apiData[i].customer.name} merchant={apiData[i].merchant.name} distance={getDistanceFromLatLon(cLat,cLon,mLat,mLon)} time={timeElapsed(createdTime)} stage={apiData[i].stage} robot={JSON.stringify(apiData[i].trip.robot[0])} cusAddress={apiData[i].customer.address} cusPhone={apiData[i].customer.phone_number} merchAddress={apiData[i].merchant.address} merchPhone={apiData[i].merchant.phone_number}/>)
    }else {
      deliveries.push(<Delivery key={i} id={apiData[i].customer.i} customer={apiData[i].customer.name} merchant={apiData[i].merchant.name} distance={getDistanceFromLatLon(cLat,cLon,mLat,mLon)} time={timeElapsed(createdTime)} stage={apiData[i].stage} robot='UNASSIGNED' cusAddress={apiData[i].customer.address} cusPhone={apiData[i].customer.phone_number} merchAddress={apiData[i].merchant.address} />)
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