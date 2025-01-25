import React from 'react';
import ActivityPrompt from './Activity prompt';
import StatusIndicator from './StatusIndicator';
import DestinationTracker from './DestinationTracker'; 
import EmergencyContacts from './EmergencyContacts'; 
import "./styles.css"

    const HomeScreen = () => {
    const personOnEmergency=()=>{
        alert("person is on emergency sending message to emergency contact numbers ")
    }
  return(
    
    <div className="home-screen"><center> 
      <h1>SafeWalk Dashboard</h1>
      

      <ActivityPrompt onEmergency={personOnEmergency}/>
   <StatusIndicator/>
   <DestinationTracker/>
   <EmergencyContacts/>
 
   </center>

    </div>
  );
};
export default HomeScreen;