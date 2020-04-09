import React from 'react';
import './faceRecognition.css';

// single face detection
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

// multiple face detection
const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='FaceRecognition'>
          <div className='image-box'>
            <img id='imageinput' alt='' src={imageUrl}/>
            {
              boxes.map((box,index) => {
                return  <div className="bounding-box"
                             key={index}
                             style={{
                                top: box.topRow,
                                right: box.rightCol,
                                bottom: box.bottomRow,
                                left: box.leftCol
                              }}>
                         </div>
              })
            }
        </div>
      </div>
    );
}

export default FaceRecognition;