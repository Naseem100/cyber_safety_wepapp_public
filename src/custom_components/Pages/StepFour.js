import React from 'react';
import TableFour from '../Components/TableFour';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Popup from "reactjs-popup";
import TextForm from "../Components/TextForm";
import AddButton from "../Buttons/AddButton";
import HelpIcon from "@material-ui/icons/Help";
import {Row, Col, Card} from 'react-bootstrap';

// This is the fourth step of the STAMP analysis.
// In this step, loss scenarios are defined for each unsafe control action in each controller.
// This is still a work in progress, but for now it consists of tables from the component TableFour,
// which creates tables with a Scenario column, Associated Causal Factors column, and Security Constraints column.

class StepFour extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = { hazards: ''}
    }

    componentDidMount() {
        // Necessary for Firebase functions
        let firebase = require('firebase');

        // Retrieves the Controllers list (it is called UCA in the database)
        firebase.database().ref(this.props.user + '/Projects/' + this.props.project + '/UCA').on('value', (snapshot) => {
            this.setState({
                UCA: (snapshot.val() != null) ? snapshot.val() : this.state.UCA
            })
        })

        // Retrieves the Hazard lists
        firebase.database().ref(this.props.user + '/Projects/' + this.props.project + '/Hazards').on('value', (snapshot) => {
            this.setState({
                hazards: (snapshot.val() != null) ? snapshot.val() : this.state.hazards
            })
        });

        document.getElementById('body').classList.remove('overflow');
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card className='first_page_row'>
                        <Card.Header>
                            <Card.Title as='h4'>List of Loss Scenarios</Card.Title>
                            <div className='tooltipdown no_print'>
                                <HelpIcon fontSize="small"/>
                                <span className='tooltiptextdown'>
                                    Click on the empty cells to edit them
                                </span>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className='step4_body'>
                                {typeof this.state.UCA === 'undefined' ? '' :
                                    Object.keys(this.state.UCA).map((uca, index) => (
                                            <TableFour index={index + 1}
                                                   UCA={this.state.UCA[uca]}
                                                   hazards={this.state.hazards}
                                                   uca_name={this.state.UCA[uca].UCA_Name} uca_id={uca}
                                                   user={this.props.user} project={this.props.project}/>
                                    ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        );
    }
}

export default StepFour;