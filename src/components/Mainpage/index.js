import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Mainpage() {
    const [status, setStatus] = useState("pending");
    const [activePopup, setActivePopup] = useState(false);

    const handleCloseAccount = () => {
        setActivePopup(!activePopup);
    };

    return (
        <>
            <div className="frame_mainPage">
                <h1 className='mainHeading'>Monitoring</h1>

                <div className='monitoringPanelDetailsContainer'>
                    {activePopup && <div className='overlay' />}

                    <div className='statusBar'>
                    <div className='status'>
                        <div
                            className='pending'
                            onClick={() => setStatus("pending")}
                            style={{color: status === "completed" ? "#ADADAD" : "#4643EE"}}
                        >
                        Pending
                        </div>
                        <div
                            className='completed'
                            onClick={() => setStatus("completed")}
                            style={{ color: status === "completed" ? "#4643EE" : "#ADADAD"}}
                        >
                        Completed
                        </div>
                    </div>

                    <div className='closeAccount' onClick={handleCloseAccount}>
                        <div>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </div>{" "}
                        Close Account
                    </div>
                    </div>
                </div>                
            </div>
        </>
    )
}

export default Mainpage