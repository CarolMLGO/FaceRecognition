import React from 'react';
import Tilt from 'react-tilt';
import styles from './Logo.module.css';
import brain from './brain.png';

const Logo=() => {
	return (
		<div className={styles.Logo} >
			<Tilt className={styles.Tilt} options={{ max : 55 }}>
			   <div className={styles.Tilt_inner}> 
			  	 <img alt='logo' src={brain} />
			   </div>
			</Tilt>
			
		</div>
		);
}

export default Logo;