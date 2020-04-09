import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm=({onInputChange,onButtonSubmit}) => {
	return (
		<div>
			<p className='ImageLink-text'>
				This Magic Brain will detect faces in your picture.<br/>
				Please paste the url link with image extensions such as JPEG, gif, png etc.
			</p>
			<div className='ImageLink'>
				<div className='ImageLink-form'>
					<input className='Form-input' type="text" onChange={onInputChange}/>
					<button className='Form-button' onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	)

}

export default ImageLinkForm;