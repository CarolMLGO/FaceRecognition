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

const initialState={
  input:'',
      imageUrl:'',
      box:{},
      route:'home',
      isSignedIn: false,
      facesArray:'',
      user:{id:'',
            name:'',
            email:'',
            entries:'',
            joined:''}
}

class App extends Component {
  constructor() {
    super()
    this.state=initialState
    }
  
  loadUser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }
  })
}

/*calculateFaceLocation = (data) => {
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
}*/

calculateFaceLocation = (data) => {
    const clarifaiFace=data.outputs[0].data.regions[0];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const listFaces=clarifaiFace.region_info.bounding_box;
    // console.log('listFaces',listFaces)
    return {
      leftCol: listFaces.left_col * width,
      topRow: listFaces.top_row * height,
      rightCol: width - (listFaces.right_col*width),
      bottomRow: height - (listFaces.bottom_row*height)}
}

  displayFaceBox=(box)=>{
    this.setState({box:box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }



  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    fetch('https://peaceful-mesa-79031.herokuapp.com/imageurl',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=>
      {if(response){
        fetch('https://peaceful-mesa-79031.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(console.log)
      }
        this.displayFaceBox(this.calculateFaceLocation(response))}
      
  )
    .catch(error=>console.log(error))
  }

  onRoutechange = (route) => {
    if (route === 'signout') {
          this.setState(initialState)
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
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        :(
          this.state.route==='signin'
          ?<Signin onRoutechange={this.onRoutechange} loadUser={this.loadUser}/>
          :<Register onRoutechange={this.onRoutechange} loadUser={this.loadUser}/>

          )

          
      }
      </div>
    );
  }
}

export default App;
