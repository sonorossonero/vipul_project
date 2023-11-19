import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faXmark,faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";
import data from "../../assets/data.json";
import { useNavigate } from "react-router-dom";
import FilteringPanel from '../FilteringPanel';

function Mainpage() {
    const [status, setStatus] = useState("pending");
    const [activePopup, setActivePopup] = useState(false);

    const triggerReasons = ["IP Change", "FIFO"];
    const actionReasons = ["Flagged", "Closed", "SOI Requested", "Cleared"];
    const reasons = status === "pending" ? triggerReasons : actionReasons;
    const nav = useNavigate();
    const riskLevels = ["Low", "Medium", "High"];

    const handleCloseAccount = () => {
        setActivePopup(!activePopup);
    };

    const handleClick = () => {
        nav("/monitoring");
        setActivePopup(!activePopup);
    };
    
    const [riskLevelVal, setRiskLevelVal] = useState("");
    const handleRiskLevelChange = (e) => {
        setRiskLevelVal(e.target.value);
    };
    const [reason, setReason] = useState("");
    const handleReason = (e) => {
        setReason(e.target.value);
    };
    const [searchText, setSearchText] = useState("");
    const handleSearchText = (e) => {
        setSearchText(e.target.value);
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

                    <div className='searchAndFilter'>
                        <div className='inputDiv'>
                            <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ color: "#ADADAD" }}
                            />
                            <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={handleSearchText}
                            />
                        </div>
                        <div className='filterDiv'>
                            <select
                            name="triggerReason"
                            id="triggerReason"
                            value={reason}
                            onChange={handleReason}
                            >
                            <option style={{ color: "grey" }} value="">
                                {status === "pending" ? "Trigger Reason" : "Action Reason"}
                            </option>
                            {reasons.map((reason, idx) => {
                                return <option value={reason.toLowerCase()}>{reason}</option>;
                            })}
                            </select>
                        </div>
                        <div className='filterDiv'>
                            {" "}
                            <select
                            name="riskLevelOptions"
                            id="riskLevelOptions"
                            value={riskLevelVal}
                            onChange={handleRiskLevelChange}
                            >
                            <option style={{ color: "grey" }} value="">
                                Risk Level
                            </option>
                            {riskLevels.map((riskLevel, idx) => {
                                return (
                                <option value={riskLevel.toLowerCase()}>{riskLevel}</option>
                                );
                            })}
                            </select>
                        </div>
                    </div>
                    <div className='primaryDetails'>
                    <FilteringPanel
                    items={data}
                    status={status}
                    filterByRisk={riskLevelVal}
                    filterByReason={reason}
                    searchBy={searchText}
                    />
                </div>
                {activePopup && (
                <div className='popup'>
                    <div className='popupHeading'>
                        <div className='popupHeadingText'>Close Account</div>
                        <div className='closeButton'>
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={handleCloseAccount}
                            style={{ color: "grey" }}
                        />
                        </div>
                    </div>

                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type="email" />
                    </div>

                    <div className='radioButtons'>
                        <div className='radioButtonsText'>Want to file UAR?</div>
                        <div className='radioButtonsBtn'>
                        <input type="radio" name="radio" id="yes" checked />
                        <label htmlFor="yes">Yes</label>

                        <input type="radio" name="radio" id="no" />
                        <label htmlFor="no">No</label>
                        </div>
                    </div>

                    <div className='selectBoxReason'>
                        <label htmlFor="reason">Reason</label>
                        <select name="reason" id="reason">
                        <option selected="selected"></option>
                        <option value="flagging">Flagging Logics Triggered</option>
                        <option value="fifo">FIFO Logics Triggered</option>
                        <option value="IP">IP Logics Triggered</option>
                        <option value="Payment">Payment Logics Triggered</option>
                        <option value="Un flag">Un flag Logics Triggered</option>
                        </select>
                    </div>

                    <div className='reasonTextBox'>
                        <label htmlFor="reasonTextBox">Note</label>
                        <textarea
                        name="reasonTextBox"
                        id="reasonTextBox"
                        draggable={false}
                        />
                    </div>

                    <div className='submitRow'>
                        <div className='submitRowRadioBtn'>
                        <input type="radio" name="chargeClosureFee" id="submitRadioBtn" />
                        <label htmlFor="submitRadioBtn">Charge closure fee</label>
                        </div>
                        <div className='submitButton'>
                        <button onClick={handleClick}>Close Account</button>
                        </div>
                    </div>

                </div>
                )}
                </div>                
            </div>
        </>
    )
}

export default Mainpage