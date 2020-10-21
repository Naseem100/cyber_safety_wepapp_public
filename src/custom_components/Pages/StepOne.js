import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import HelpIcon from "@material-ui/icons/Help";
import AddButton from "../Buttons/AddButton";
import TargetSystem from "../Components/TargetSystem";
import Goal from "../Components/Goal";
import Losses from "../Components/Losses";
import Functions from "../Components/Functions";
import Hazards from "../Components/Hazards";
import Constraints from "../Components/Constraints";
import Interdependency from "../Components/Interdependency";

// This is the first Step in the Stamp Analysis, and the first page after the Projects Page
// It uses 7 different components to load all of the information
// That includes the Target System, Goals, Losses, Functions, Hazards, Constraints, and Interdependencies

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_mode: false,
            systemDisplay: 'none',
            goalsDisplay: 'none',
            lossesDisplay: 'none',
            functionsDisplay: 'none',
            hazardsDisplay: 'none',
            constraintsDisplay: 'none',
            interParentDisplay: 'none',
            interPhysDisplay: 'block',
            interInfoDisplay: 'block',
            interGeoDisplay: 'block',
            interLogicDisplay: 'block',
            system: '',
            goals: {
                To: 'To ...',
                By: 'By ...',
                Using: 'Using ...'
            }
        }

        this.LastHash = '';
        this.handleClick = this.handleClick.bind(this);
        this.handleEditMode = this.handleEditMode.bind(this);
    }

    handleEditMode() {
        this.setState({edit_mode:!this.state.edit_mode});
    }

    handleClick(event, display) {
        if(this.state[display] === 'block') {
            this.setState({
                [display]: 'none'
            })
        } else {
            this.setState({
                [display]: 'block'
            })
        }
    }

    componentDidMount() {
        // Required to use firebase tools such as auth, storage, and database
        const firebase = require('firebase');
        require('firebase/database');

        const database = firebase.database();

        // Retrieves data for Target System
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Target_System/Target_System').on('value', (snapshot) => {
            this.setState({
                system: (snapshot.val() != null) ? snapshot.val() : this.state.system
            })
        });

        // Retrieves data for Goals List
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Goals').on('value', (snapshot) => {
            this.setState({
                goals: (snapshot.val() != null) ? snapshot.val() : this.state.goals
            })
        });

        // Retrieves data for Losses list
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Losses').on('value', (snapshot) => {
            this.setState({
                losses: (snapshot.val() != null) ? snapshot.val() : this.state.losses
            })
        });

        // Retrieves data for Functions list
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Functions').on('value', (snapshot) => {
            this.setState({
                functions: (snapshot.val() != null) ? snapshot.val() : this.state.functions
            })
        });

        // Retrieves data for Hazard lists
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Hazards').on('value', (snapshot) => {
            this.setState({
                hazards: (snapshot.val() != null) ? snapshot.val() : this.state.hazards
            })
        });

        // Retrieves data for Constraints lists
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Constraints').on('value', (snapshot) => {
            this.setState({
                constraints: (snapshot.val() != null) ? snapshot.val() : this.state.constraints
            })
        });

        // Retrieves data for Physical Interdependencies lists
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Interdependency/Physical').on('value', (snapshot) => {
            this.setState({
                interPhys: (snapshot.val() != null) ? snapshot.val() : this.state.interPhys
            })
        });

        // Retrieves data for Informational Interdependencies lists
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Interdependency/Informational').on('value', (snapshot) => {
            this.setState({
                interInfo: (snapshot.val() != null) ? snapshot.val() : this.state.interInfo
            })
        });

        // Retrieves data for Geographical Interdependencies lists
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Interdependency/Geographical').on('value', (snapshot) => {
            this.setState({
                interGeo: (snapshot.val() != null) ? snapshot.val() : this.state.interGeo
            })
        });

        // Retrieves data for Logical Interdependencies lists
        database.ref(this.props.user + '/Projects/' + this.props.project + '/Interdependency/Logical').on('value', (snapshot) => {
            this.setState({
                interLogic: (snapshot.val() != null) ? snapshot.val() : this.state.interLogic
            })
        });

        document.getElementById('body').classList.remove('overflow');
    }

    render() {
        let losses = (typeof this.state.losses === 'undefined'?null:(this.state.losses));
        let hazards = (typeof this.state.hazards === 'undefined'?null:(this.state.hazards));
        let constraints = (typeof this.state.constraints === 'undefined'?null:Object.keys(this.state.constraints));

        // This is important for opening up and going to the correct component from the sidebar
        if(document.location.hash.replace('#','') !== '') {
            if(this.LastHash !== document.location.hash.replace('#','')) {
                this.setState({
                    [document.location.hash.replace('#', '') + 'Display']: 'block'
                })
            }
            this.LastHash = document.location.hash.replace('#','')
        }

        return (
            <Aux>
                <Row>
                    <div className='edit_mode_parent first_page_row no_print'>
                        <div className='tooltipleft'>
                            <a className='edit_mode' href='javascript:void(0)' onClick={this.handleEditMode}>
                                Edit Mode
                                <span className='tooltiptextleft'>{this.state.edit_mode ? 'Click to exit total edit mode' : 'Click to activate total edit mode'}</span>
                            </a>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col md xl>
                        <Card className='clickable'>
                            <Card.Header id='system' onClick={(event) => this.handleClick(event,'systemDisplay')}>
                                <Card.Title as='h4' >What is the Target System?</Card.Title>
                                <div className='tooltipdown'>
                                    <HelpIcon fontSize="small" className='no_print'/>
                                    <span className='tooltiptextdown'>
                                        {this.state.edit_mode ? 'Press Enter in each form to submit the edit. Popups can also all be dragged along the screen' : 'Use the icons to add and edit fields OR Click on existing fields to edit. Popups can also all be dragged along the screen'}
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.systemDisplay} }>
                                <TargetSystem user={this.props.user} project={this.props.project} edit_mode={this.state.edit_mode} system={this.state.system}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md xl>
                        <Card className='clickable'>
                            <Card.Header id='goals' onClick={(event) => this.handleClick(event, 'goalsDisplay')}>
                                <Card.Title as='h4' >What is the Goal/Mission of the System?</Card.Title>
                                <div className='tooltipdown'>
                                    <HelpIcon fontSize="small" className='no_print'/>
                                    <span className='tooltiptextdown'>
                                        These goals will help guide the analysis of the system
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.goalsDisplay} }>
                                <Goal user={this.props.user} project={this.props.project} edit_mode={this.state.edit_mode} goals={this.state.goals}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md xl>
                        <Card className='clickable'>
                            <Card.Header id='losses' onClick={(event) => this.handleClick(event, 'lossesDisplay')}>
                                <Card.Title as='h4' >What is the worst that can happen to the System?</Card.Title>
                                <div className='tooltipdown'>
                                    <HelpIcon fontSize="small" className='no_print'/>
                                    <span className='tooltiptextdown'>
                                        Losses are system conditions or events that would be unacceptable to the mission owners (primary stakeholder). These can be fairly general and quite similar for most systems. However, in order to determine hazards that lead to these losses, it is important to understand the processes that enable the system to achieve its mission                                   </span>
                                </div>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.lossesDisplay} }>
                                <div className='part2_subheader'>
                                    <div>
                                        <h4 className='part2'>System-Level Losses</h4>
                                        <AddButton user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Losses'} prefix='L-' type='Losses'  placeholder='Loss:' header='What is the worst that can happen to the System?'/>
                                    </div>
                                </div>
                                <Losses user={this.props.user} project={this.props.project} hazards={hazards} edit_mode={this.state.edit_mode} losses={this.state.losses}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md xl>
                        <Card className='clickable'>
                            <Card.Header id='functions' onClick={(event) => this.handleClick(event, 'functionsDisplay')}>
                                <Card.Title as='h4' >What Functions enable the System to achieve its mission?</Card.Title>
                                <div className='tooltipdown'>
                                    <HelpIcon fontSize="small" className='no_print'/>
                                    <span className='tooltiptextdown'>
                                        In delivering the mission, these functions must be performed; these are the functions that make up the CONOPS of the OT Production System. This gives some insight about Step 2 of the process, where we can begin to predict what control loops must be included in the control structure
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.functionsDisplay} }>
                                <div className='part2_subheader'>
                                    <div>
                                        <h4 className='part2'>System-Level Functions</h4>
                                        <AddButton user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Functions'} prefix='' type='Functions' placeholder='Function:' header='What Functions enable the System to achieve its mission?'/>
                                    </div>
                                </div>
                                <Functions user={this.props.user} project={this.props.project} edit_mode={this.state.edit_mode} functions={this.state.functions}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md xl>
                        <Card className='clickable'>
                            <Card.Header id='hazards' onClick={(event) => this.handleClick(event, 'hazardsDisplay')}>
                                <Card.Title as='h4'>What Hazards can lead to system-level Losses?</Card.Title>
                                <div className='tooltipdown'>
                                    <HelpIcon fontSize="small" className='no_print'/>
                                    <span className='tooltiptextdown'>
                                        Hazards are system states that can result in a loss under worst case environmental conditions. The hazards have to be defined in terms of the system NOT individual components
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.hazardsDisplay} }>
                                <div className='part2_subheader'>
                                    <div>
                                        <h4 className='part2'>System-Level Hazards</h4>
                                        <AddButton user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Hazards'} prefix='H-' key_text='Haz_text'  related_tags='Losses' options={(losses)} type='Hazards' placeholder='Hazard:' header='What Hazards can lead to system-level Losses?'/>
                                    </div>
                                </div>
                                <Hazards user={this.props.user} project={this.props.project} constraints={constraints} edit_mode={this.state.edit_mode} hazards={this.state.hazards} losses={losses}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md xl>
                        <Card className='clickable'>
                            <Card.Header id='constraints' onClick={(event) => this.handleClick(event, 'constraintsDisplay')}>
                                <Card.Title as='h4' >What system-level Constraints can be defined?</Card.Title>
                                <div className='tooltipdown'>
                                    <HelpIcon fontSize="small" className='no_print'/>
                                    <span className='tooltiptextdown'>
                                        Constraints can be derived by inverting the system-level hazards
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.constraintsDisplay} }>
                                <div className='part2_subheader'>
                                    <div>
                                        <h4 className='part2'>System-Level Constraints</h4>
                                        <AddButton user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Constraints'} prefix='SC-' key_text='Cons_text' related_tags='Hazards' options={(hazards)} type='Constraints' placeholder='Constraint:' header='What system-level Constraints can be defined?'/>
                                    </div>
                                </div>
                                <Constraints user={this.props.user} project={this.props.project} edit_mode={this.state.edit_mode} constraints={this.state.constraints} hazards={hazards}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className='clickable'>
                            <Card.Header id='interParent' onClick={(event) => this.handleClick(event, 'interParentDisplay')}>
                                <Card.Title as='h4' >Understanding Interdependencies of the System</Card.Title>
                            </Card.Header>
                            <Card.Body style={ {display: this.state.interParentDisplay} }>
                                <Row>
                                    <Col md xl>
                                        <Card className='clickable'>
                                            <Card.Header id='interPhys' onClick={(event) => this.handleClick(event, 'interPhysDisplay')}>
                                                <div className='part2_subheader'>
                                                    <div>
                                                        <Card.Title as='h4' >Physical (Inputs/Outputs)</Card.Title>
                                                        <AddButton id='add_button' user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Interdependency/Physical'} prefix='' type='Losses' placeholder='Physical:' header='What Physical Interdependencies exist?'/>
                                                    </div>
                                                    <div className='tooltipdown'>
                                                        <HelpIcon fontSize="small" className='no_print'/>
                                                        <span className='tooltiptextdown'>
                                                            An infrastructure is physically dependent if there is a functional and structural linkage between the input(s) and output(s) of two assets: a commodity produced or modified by one infrastructure (an output) is required by another infrastructure for its operation (an input)
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card.Header>
                                            <Card.Body style={ {display: this.state.interPhysDisplay} }>
                                                <Interdependency user={this.props.user} project={this.props.project} short_path='/Interdependency/Physical'  interData={this.state.interPhys} edit_mode={this.state.edit_mode} header='What Physical Interdependencies exist?'/>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md xl>
                                        <Card className='clickable'>
                                            <Card.Header id='interInfo' onClick={(event) => this.handleClick(event, 'interInfoDisplay')}>
                                                <div className='part2_subheader'>
                                                    <div>
                                                        <Card.Title as='h4' >Informational</Card.Title>
                                                        <AddButton id='add_button' user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Interdependency/Informational'} prefix='' type='Losses' placeholder='Information:' header='What Informational interdependencies exist?'/>
                                                    </div>
                                                    <div className='tooltipdown'>
                                                        <HelpIcon fontSize="small" className='no_print'/>
                                                        <span className='tooltiptextdown'>
                                                            An asset has a cyber dependency if its operation depends on information transmitted via electronic or informational links
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card.Header>
                                            <Card.Body style={ {display: this.state.interInfoDisplay} }>
                                                <Interdependency user={this.props.user} project={this.props.project} short_path='/Interdependency/Informational' interData={this.state.interInfo} edit_mode={this.state.edit_mode} header='What Informational Interdependencies exist?'/>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md xl>
                                        <Card className='clickable'>
                                            <Card.Header id='interGeo' onClick={(event) => this.handleClick(event, 'interGeoDisplay')}>
                                                <div className='part2_subheader'>
                                                    <div>
                                                        <Card.Title as='h4' >Geographical</Card.Title>
                                                        <AddButton id='add_button' user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Interdependency/Geographical'} prefix='' type='Losses' placeholder='Geographical:' header='What Geographical Interdependencies exist?'/>
                                                    </div>
                                                    <div className='tooltipdown'>
                                                        <HelpIcon fontSize="small" className='no_print'/>
                                                        <span className='tooltiptextdown'>
                                                            Assets are geographically dependent if an event in the local environment can create changes in those assets’ state of operations. A geographic dependency occurs when elements of infrastructure assets are in close spatial proximity
                                                    </span>
                                                    </div>
                                                </div>
                                            </Card.Header>
                                            <Card.Body style={ {display: this.state.interGeoDisplay} }>
                                                <Interdependency user={this.props.user} project={this.props.project} short_path='/Interdependency/Geographical' interData={this.state.interGeo} edit_mode={this.state.edit_mode} header='What Geographical Interdependencies exist?'/>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md xl>
                                        <Card className='clickable'>
                                            <Card.Header id='interLogic' onClick={(event) => this.handleClick(event, 'interLogicDisplay')}>
                                                <div className='part2_subheader'>
                                                    <div>
                                                        <Card.Title as='h4' >Logical</Card.Title>
                                                        <AddButton id='add_button' user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Interdependency/Logical'} prefix='' type='Losses' placeholder='Logical:' header='What Logical Interdependencies exist?'/>
                                                    </div>
                                                    <div className='tooltipdown'>
                                                        <HelpIcon fontSize="small" className='no_print'/>
                                                        <span className='tooltiptextdown'>
                                                            An infrastructure is logically dependent if its state of operations depends on the state of another infrastructure via a mechanism that is not a physical, cyber, or geographic connection. Logical dependency is attributable to human decisions and actions
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card.Header>
                                            <Card.Body style={ {display: this.state.interLogicDisplay} }>
                                                <Interdependency user={this.props.user} project={this.props.project} short_path='/Interdependency/Logical' interData={this.state.interLogic} edit_mode={this.state.edit_mode} header='What Logical Interdependencies exist?'/>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Aux>
        );
    }
}

export default Dashboard;