import React from 'react';
import './Rank.css';

const Rank=({name,entries}) => {
	return (
		<div className="Rank">
			<div className='user'>
				{`Hello, ${name}`}
			</div>
			<div className='text'>
				{'---your current face detection is---'}
			</div>
			<div className='entries'>
				{entries}
			</div>
		</div>
		);
}

export default Rank;