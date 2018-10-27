import React from 'react';
import './faceRecognition.css';


/*const FaceRecognition = ({ imageUrl, box }) => {
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
      )
    })*/

const FaceRecognition = ({ imageUrl, box }) => {

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;




