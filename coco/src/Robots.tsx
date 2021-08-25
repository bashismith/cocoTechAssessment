import React, {useState} from 'react';
import { Robot } from './TypesAndInterfaces';



const Robots = (props: Robot) => {
  const [robotBtn, setRobot] = useState<number>(0);

  const expandRobotInfo = () => {
    robotBtn === 0 ? setRobot(1) : setRobot(0)
  }

  return(
    <div id="merchant">
      <span>Robot: {props.name}<button style={{'marginLeft': '5px'}} onClick={expandRobotInfo}>Info</button></span>
      {(robotBtn === 0) ? '': <ul><li>Robot ID: {props.id}</li><li>Robot Issue: {props.issue}</li></ul>}
      <br></br>
  </div>
    )
};

export default Robots;