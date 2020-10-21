import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import manual from "../../../assets/CyberSafetyManual_SK2.pdf";
import mit from "../../../assets/images/mit-white.jpeg"

// This is the sign in page that is shown to new users
// Uses Firebaseui to create the Gmail and Email sign in blocks

var firebaseui = require('firebaseui');
var firebase = require('firebase');

class SignUp1 extends React.Component {
    constructor(props) {
        super(props);

        this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    }
    render () {

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    console.log(authResult)
                    return true;
                },
                uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '/',
        };

        return(
            <Aux>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div id='firebaseui-auth-container'>
                                </div>
                                <div id='loader'>
                                </div>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                                <img src={mit} height={75} width={150}/>
                                <p className="mb-2 text-muted">Cybersafety Application Tool (CAT) is an online application that facilitates an integrated, holistic safety and
                                    security analysis using Systems and Controls Theory </p>
                                <a href={manual} download={"CyberSecurityManual.pdf"}>
                                    Click here for more info
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;