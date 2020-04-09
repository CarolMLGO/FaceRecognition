import React from 'react';
import ProfileIcon from '../../Profile/ProfileIcon';
import styles from './Navigation.module.css';
import {NavLink} from 'react-router-dom';

const Navigation=({isSignedIn}) => {
	if (isSignedIn) {
		return(
			<nav className={styles.Nav}>
				<ProfileIcon link="/signout"/>
			</nav>
			)
	} else {
		return(
			<nav className={styles.Nav}>
				<NavLink exact activeClassName={styles.active} to="/"> Home </NavLink>
				<NavLink exact activeClassName={styles.active} to="/signin"> Sign In </NavLink>
				<NavLink exact activeClassName={styles.active} to="/register"> Register </NavLink>
			</nav>
			)
}

}

export default Navigation;