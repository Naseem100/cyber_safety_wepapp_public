import React, { Component, Suspense } from 'react';
import {Switch, Route, HashRouter, BrowserRouter} from 'react-router-dom';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import Aux from "../hoc/_Aux";
import SignIn1 from '../Demo/Authentication/SignIn/SignIn1'
import Projects from "../custom_components/Pages/Projects";
import AdminLayout from "./layout/AdminLayout";

// This is used to connect to the firebase account, will need to input your own information for app from the
// firebase console.
const firebase = require('firebase');
// eslint-disable-next-line no-unused-vars
const app = firebase.initializeApp({
    apiKey: "AIzaSyD6hkZPz8Yrzi4S5sFPhYhm3REMrlLFiPw",
    authDomain: "cattestproject-f2693.firebaseapp.com",
    databaseURL: "https://cattestproject-f2693.firebaseio.com",
    projectId: "cattestproject-f2693",
    storageBucket: "cattestproject-f2693.appspot.com",
    messagingSenderId: "418425083351",
    appId: "1:418425083351:web:5213329f49d6398c44e792",
    measurementId: "G-J8Q5VMDP3Y"
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                this.setState({
                    user: user
                })
                console.log('Valid User');
            }
            else{
                console.log('No User');
            }
        }.bind(this));
    }


    render() {

        if(this.state.user === null) {
            return <SignIn1 />
        }
        else if(this.state.user != null ){
            return (
                <Aux>
                    <Switch>
                        <Route exact path='/' render={(props) => (<Projects {...props} user={this.state.user}/>)}/>
                        <Route path="/:value" component={(props) => (<AdminLayout {...props} user={this.state.user}/>)}/>
                    </Switch>
                </Aux>
            );
        }
    }
}

export default App;
