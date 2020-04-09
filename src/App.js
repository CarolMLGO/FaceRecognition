import React, { Component } from 'react';
import Signin from './containers/Auth/Signin/Signin';
import Register from './containers/Auth/Register/Register';
import ImageRecognition from './containers/ImageRecognition/ImageRecognition';
import styles from './App.module.css';
import Particles from './Components/Particles/Particles';
import Toolbar from './Components/Toolbar/Toolbar';
//react router
import { Route, Switch } from 'react-router-dom';

const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    //test backend 
    // componentDidMount() {
    //     fetch(`${url}`)
    //         .then(res => res.json())
    //         .then(console.log)

    // }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }
    render() {
        return (
        <div className={styles.App}> 
            <Particles />
            <Toolbar isSignedIn={this.state.isSignedIn}/>
            <Switch>
                <Route path='/' exact render={()=>(<ImageRecognition user={this.state.user}/>)}/>
                <Route path='/signin' render={()=>(<Signin loadUser={this.loadUser}/>)} />
                <Route path='/register' render={()=>(<Register loadUser={this.loadUser}/>)} />
                <Route render={()=><h1> URL Not Found </h1>} />
            </Switch>
      </div>);
    }
}

export default App;