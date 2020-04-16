import React from 'react';
import styles from './imageLinkForm.module.css';

const ImageLinkForm=({onInputChange,onButtonSubmit,onRandomLink,urlValue,loading}) => {
	return (
			<div className={styles.ImageLink_form}>
				<p className={styles.Form_text}> Enter an image url link, Smart Brain will detect faces in your image. Or you can generate some <span className={styles.Form_randomLink} onClick={onRandomLink}>random link</span> to try it out!{loading?<span style={{color:'white',fontSize:'1.2rem'}}>loading...</span>:''}
                </p>
                
				<input className={styles.Form_input} type="text" onChange={onInputChange} placeholder="https://" value={urlValue}/>
				<button className={styles.Form_button} onClick={onButtonSubmit}>Detect</button>
			</div>
	)

}

export default ImageLinkForm;