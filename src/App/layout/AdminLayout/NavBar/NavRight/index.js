import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link, Redirect, Switch} from 'react-router-dom'

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar2 from '../../../../../assets/images/user/user.png';

class NavRight extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        window.print();
    }

    render() {
        let firebase = require('firebase');
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                {this.props.user_name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar2} className="img-radius" alt="User Profile"/>
                                    <span>{this.props.user_name}</span>
                                    <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                        <i onClick={() => {firebase.auth().signOut().then(() => {
                                            window.location.reload();
                                        })}} className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><Link to='/' className="dropdown-item"><i className="feather icon-home"/> Projects</Link></li>
                                    <li><a href={DEMO.BLANK_LINK} onClick={this.handleClick} className="dropdown-item"><i className="feather icon-info"/> Print</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </Aux>
        );
    }
}

export default NavRight;