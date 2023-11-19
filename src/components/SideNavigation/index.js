import React from 'react';
import './style.css'; // assuming you have a separate stylesheet
import userData from '../../assets/userInfo.json';

function SideNavigation() {
    return (
        <>
            <div className='customFrame_sideNavigation'></div>
            <div className='customPanel'>
                <div className='customNavPages'>
                    <h1 className='customLogo'>LOGO HERE</h1>
                    <ul>
                        <li>Overview</li>
                        <li>Onboarding</li>
                        <li className='customActive'>Monitoring</li>
                        <li>Flagging</li>
                        <li>Source of Income</li>
                        <li>UAR</li>
                    </ul>
                </div>

                <div className='customUserInfo'>
                    <img src={userData.photo} alt="user" />
                    <div className='customUserInfoContainer'>
                        <h3>{userData.name}</h3>
                        <p>{userData.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideNavigation;
