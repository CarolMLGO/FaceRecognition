import React, {Component,Fragment} from 'react';
// import styles from './ImageRecognition.module.css';
import FaceRecognition from '../../Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../../Components/ImageLinkForm/ImageLinkForm';
import Rank from '../../Components/Rank/Rank';
import OwnImageForm from '../../Components/OwnImageForm/OwnImageForm';
//development only: for easier server change 
import { url } from '../../url';

const initialState = {
    input:'',
    imageUrl: '',
    boxes: [],
    route: 'home',
    isSignedIn: true,
    facesArray: '',
    randomLinkLoading:false,
    isApiLoading: false,
    faceDetected: true
}

class ImageRecognition extends Component {
    state = initialState;
    // multiple face calculation
    calculateMultipleFaces = (clarifaiFaces) => {
        const boxes = [];
        const image = document.getElementById('imageinput');
        const width = Number(image.width);
        const height = Number(image.height);
        clarifaiFaces.forEach(clarifaiFace => {
            const listFaces = clarifaiFace.region_info.bounding_box;
            boxes.push({
                leftCol: listFaces.left_col * width,
                topRow: listFaces.top_row * height,
                rightCol: width - (listFaces.right_col * width),
                bottomRow: height - (listFaces.bottom_row * height)
            })
        })
        return boxes
    };

    displayFaceBox = (boxes) => {
        this.setState({ boxes: boxes })
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value,faceDetected:true })
    };

    onButtonSubmit = () => {
        //api call set up
        const Clarifai = require('clarifai');
        const app = new Clarifai.App({
                apiKey: '2c31633468e34cce98e3318cfdcc3081'
            });

        //catch most http error if user using url
        if (this.state.input.includes('http')) {
            if (this.state.input.includes('http')){
            this.setState({imageUrl: this.state.input})
            } else {
                return this.setState({input:'Enter a valid address'})
            };
        }
        //clear boxes and start API loading
        this.setState({boxes:"", isApiLoading:true, faceDetected:true});

        // if we want to move api call to the back end
        // fetch(`${url}/imageurl`, {
                // method: 'post',
                // headers: { 'Content-Type': 'application/json'},
                // headers: {'Content-type': 'text/plain'},
                // body: JSON.stringify({
                //     input: this.state.input
                // })
                // body:JSON.stringify({this.state.input})
            // })
            app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                if (response.status.description !== 'Ok') {
                    this.setState({faceDetected:false});
                    throw new Error(response.status)
                }
                else return response
            })
            .then(response => {
                    this.setState({isApiLoading:false,input:''}); //clear input after get a response
                    // to see if there is a face detected
                    const clarifaiFaces = response.outputs[0].data.regions;
                    if (clarifaiFaces) {
                        this.displayFaceBox(this.calculateMultipleFaces(clarifaiFaces));
                        this.setState({faceDetected:true})
                    } else {
                        this.setState({faceDetected:false})
                    }
                    //fetch entries from backend
                    if (this.props.user.name) {
                        fetch(`${url}/image`, {
                                method: 'put',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: this.props.user.id
                                })
                            })
                            .then(response => response.json())
                            .then(count => {
                                Object.assign(this.props.user, { entries: count })
                            })
                            .catch(console.log)
                    } 
                }
            )
            .catch(error => {
                console.log(error);
                this.setState({input:'Enter a valid address',isApiLoading:false});
                })
    };

    handleRandomLink = () => {
        this.setState({...initialState});
        this.setState({randomLinkLoading: true});
        fetch('https://source.unsplash.com/random')
            .then(image => this.setState({input: image.url + '.jpg',randomLinkLoading:false}))
            .catch(err => console.log(err));
  };

//if user upload thier own image
  fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    this.setState({...initialState});
    if (file) {
        this.setState({imageUrl:URL.createObjectURL(file)});
        let reader = new FileReader();
        reader.onload = (event) => {
            this.setState({input:event.target.result.split(',')[1]})
        }
        reader.readAsDataURL(file)
    }
  }

    render() {
        return (
            <Fragment>
                <Rank name={this.props.user.name} entries={this.props.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onRandomLink={this.handleRandomLink} urlValue={this.state.input} loading={this.state.randomLinkLoading}/>
                <OwnImageForm onFileSelected={this.fileSelectedHandler}/>
                <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} faceDetected={this.state.faceDetected} loading={this.state.isApiLoading}/>
            </Fragment>
        )
    }
};

export default ImageRecognition;