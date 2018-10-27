import React from 'react';

const Rank=({name,entries}) => {
	return (
		<div>
			<div className='black f1'>
				{`${name}`}
			</div>
			<div className='white f3'>
				{'---your current face detection is---'}
			</div>
			<div className='white f1'>
				{entries}
			</div>
		</div>
		);
}

export default Rank;