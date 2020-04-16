import React from 'react';
import styles from './OwnImageForm.module.css';
// import Button from '../UI/Button/Button'

const OwnImageForm = (props) => {
    return (
    <div className={styles.ownImage}>
        <p className={styles.file_text}> You can also choose to upload your own image to start. And click "DETECT" above to detect faces. </p>
        <input style={{'display':'none'}} type="file" accept="image/gif,image/jpeg,image/png" onChange={props.onFileSelected} id="file"/>
        <label className={styles.file_input} htmlFor="file"> Select files</label>
    </div>
    );
};

export default OwnImageForm;




