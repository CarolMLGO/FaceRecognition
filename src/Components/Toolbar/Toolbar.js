import React from 'react';
import styles from './Toolbar.module.css';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

const toolbar = (props) => {
    return (
        <div className={styles.Toolbar}>
            <Logo />
            <Navigation isSignedIn={props.isSignedIn} />
        </div>
    )
};

export default toolbar;      



