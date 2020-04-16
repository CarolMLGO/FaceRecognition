import React,{Fragment} from 'react';
import './faceRecognition.css';
import Spinner from '../UI/Spinner/Spinner';

const FaceRecognition = ({ imageUrl, boxes, loading,faceDetected }) => {
    return (
        <div className='FaceRecognition'>
            <div className='image-box'>
              {faceDetected?'':<p style={{color:'red',textAlign:'center',fontSize:"1.5rem"}}>No face detected or invalid address</p>}
              {loading?
                <Fragment>
                  <p style={{color:'white',fontSize:'1.2rem',textAlign:'center'}}>Face is detecting and loading...</p>
                  <Spinner size="small"/>
                </Fragment>
                :''}
              <img id='imageinput' alt='' src={imageUrl} />
              {boxes.length>0?
                boxes.map((box,index) => {
                  return  <div className="bounding-box"
                               key={index}
                               style={{
                                  top: box.topRow,
                                  right: box.rightCol,
                                  bottom: box.bottomRow,
                                  left: box.leftCol
                                }}>
                           </div>})
                :
                ''
                }
            </div>
            
      </div>
    );
}

export default FaceRecognition;