import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import windowSize from 'react-window-size';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";

class NavLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_name: 'Project Name'
        }
    }

    componentDidMount() {
        let firebase = require('firebase')
        // Project Name
        firebase.database().ref(this.props.user + '/Projects/' + this.props.project + '/Project_Name/Project_Name').on('value', (snapshot) => {
            this.setState({
                project_name: (snapshot.val() != null) ? snapshot.val() : this.state.project_name
            })
        });
    }

    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        let navItemClass = ['nav-item'];
        if (this.props.windowWidth <= 575) {
            navItemClass = [...navItemClass, 'd-none'];
        }
        let dropdownRightAlign = false;
        if (this.props.rtlLayout) {
            dropdownRightAlign = true;
        }


        return (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li><a href={DEMO.BLANK_LINK} className="full-screen" onClick={this.props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a></li>
                    <li className={'nav-item project_name'}>
                        {this.state.project_name}
                    </li>
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.isFullScreen,
        rtlLayout: state.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({type: actionTypes.FULL_SCREEN}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft));
