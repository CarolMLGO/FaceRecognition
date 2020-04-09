import React, {Component} from 'react';
import './ProfileIcon.css';
import {NavLink} from 'react-router-dom';

//svgs
import profileIcon from '../../assets/SVG/people_alt.svg';
import dropdownProfileIcon from '../../assets/SVG/person_add.svg';
import logoutIcon from '../../assets/SVG/clear.svg';

class ProfileIcon extends Component {
    render() {
        return (
            <div className="Profile">
                <div className="Profile-nav">
                    <img className="Profile-nav__icon" src={profileIcon} alt="Profile"/>
                </div>

                <div className="Profile-dropdown">
                    <ul className="Profile-dropdown__menu">
                        <li className="Profile-dropdown__item">
                            <NavLink to='/profile' className="Profile-dropdown__link"  exact> 
                                <img className="Profile-dropdown__icon" src={dropdownProfileIcon} alt="Profile"/>
                                <span className="Profile-dropdown__text">Profile</span> 
                            </NavLink> 
                        </li>

                        <li className="Profile-dropdown__item">
                            <NavLink to='/signin' className="Profile-dropdown__link" exact>
                                <img className="Profile-dropdown__icon" src={logoutIcon} alt="Profile"/>
                                <span className="Profile-dropdown__text">Sign out</span>
                            </NavLink> 
                        </li>
                        
                    </ul>
                </div>
            </div>
        )
    }
};

export default ProfileIcon;
