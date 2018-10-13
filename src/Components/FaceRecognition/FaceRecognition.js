import React from 'react';
import './faceRecognition.css';


const FaceRecognition = ({ imageUrl, box }) => {
	const mappedBox = box.map((singleBox, id) => {
      return (
        <div
          key={id}
          className="bounding_box"
          style={{
            top: singleBox.topRow,
            right: singleBox.rightCol,
            bottom: singleBox.bottomRow,
            left: singleBox.leftCol
          }}
        />
      );
    });

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div className="bounding_box_set">{mappedBox}</div>
      </div>
    </div>
  );
}

export default FaceRecognition;




