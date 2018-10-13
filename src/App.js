import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '2c31633468e34cce98e3318cfdcc3081'
});

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor() {
    super()
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'home',
      isSignedIn: false,
      facesArray:'',
    }
  }

calculateFaceLocation = (data) => {
    const clarifaiFace=data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    clarifaiFace.map(face=>

      {const listFaces=face.region_info.bounding_box;
        console.log('check listFaces',listFaces);
        return {leftCol: listFaces.left_col * width,
        topRow: listFaces.top_row * height,
        rightCol: width - (listFaces.right_col*width),
        bottomRow: height - (listFaces.bottom_row*height)}
      })
}

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log('check box',this.state.box)
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(error=>console.log(error))
  }

  onRoutechange = (route) => {
    if (route === 'signout') {
          this.setState({isSignedIn:false})
        } else if (route==='home'){
          this.setState({isSignedIn:true})
        }
    this.setState({route:route})    
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRoutechange={this.onRoutechange} />
        { this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        :(
          this.state.route==='signin'
          ?<Signin onRoutechange={this.onRoutechange}/>
          :<Register onRoutechange={this.onRoutechange}/>

          )

          
      }
      </div>
    );
  }
}

export default App;
