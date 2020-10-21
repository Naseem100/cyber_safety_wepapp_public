import React, { Component, Suspense } from 'react';
import {Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import StepOne from "../../../custom_components/Pages/StepOne"
import StepTwo from '../../../custom_components/Pages/StepTwo'
import StepThree from "../../../custom_components/Pages/StepThree";
import StepFour from "../../../custom_components/Pages/StepFour";
import './app.scss';

// This is the component that links the web tool together using react-router-dom. Will route all
// of the different steps depending on the url.

class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);



        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <NavBar url={this.props.match.url} user={this.props.user} project={this.props.match.params.value}/>
                    <Navigation />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Switch>
                                                <Route exact path={`${this.props.match.url}/stepOne`} render={(props) => (<StepOne {...props} project={this.props.match.params.value} user={this.props.user.email.split('.').join('')}/>)}/>
                                                <Route exact path={`${this.props.match.url}/stepTwo`} render={(props) => (<StepTwo {...props} project={this.props.match.params.value} user={this.props.user.email.split('.').join('')}/>)}/>
                                                <Route exact path={`${this.props.match.url}/stepThree`} render={(props) => (<StepThree {...props} project={this.props.match.params.value} user={this.props.user.email.split('.').join('')}/>)}/>
                                                <Route exact path={`${this.props.match.url}/stepFour`} render={(props) => (<StepFour {...props} project={this.props.match.params.value} user={this.props.user.email.split('.').join('')}/>)}/>
                                                <Redirect from={`${this.props.match.url}`} to={`${this.props.match.url}/stepOne`} project={this.props.match.params.value} user={this.props.user.email.split('.').join('')}/>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));