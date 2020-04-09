import React, {Component} from 'react';
// import styles from './ImageRecognition.module.css';
import FaceRecognition from '../../Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../../Components/ImageLinkForm/ImageLinkForm';
import Rank from '../../Components/Rank/Rank';
//development only: for easier server change 
import { url } from '../../url';

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'home',
    isSignedIn: true,
    facesArray: ''
}

class ImageRecognition extends Component {
    state = initialState;

    // multiple face calculation
    calculateMultipleFaces = (data) => {
        const boxes = [];
        const clarifaiFaces = data.outputs[0].data.regions;
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
        this.setState({ input: event.target.value })
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch(`${url}/imageurl`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: this.state.input
                })
            })
            .then(response => response.json())
            .then(response => {
                    if (response) {
                        fetch(`${url}/image`, {
                                method: 'put',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: this.props.user.id
                                })
                            })
                            .then(response => response.json())
                            .then(count => {
                                this.setState(Object.assign(this.state.user, { entries: count }))
                            })
                            .catch(console.log)
                    }
                    // this.displayFaceBox(this.calculateFaceLocation(response))
                    this.displayFaceBox(this.calculateMultipleFaces(response))
                }

            )
            .catch(error => console.log(error))
    };

    render() {
        return (
            <div>
                <Rank name={this.props.user.name} entries={this.props.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
            </div>
        )
    }
};

export default ImageRecognition;