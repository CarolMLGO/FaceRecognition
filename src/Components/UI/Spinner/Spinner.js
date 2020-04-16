import React from 'react';
import styles from './Spinner.module.css';

const spinner = (props) => {
    return (
        <div className={[styles.loader,styles[props.size]].join(' ')}></div>
    )
}

export default spinner;