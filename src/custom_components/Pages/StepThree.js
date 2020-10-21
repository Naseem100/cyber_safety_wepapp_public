import React from 'react';
import TableThree from '../Components/TableThree';
import AddButton from "../Buttons/AddButton";
import HelpIcon from "@material-ui/icons/Help";
import {Row, Col, Card} from 'react-bootstrap';

// This is the third step of the STAMP analysis.
// This is where the controllers are defined and their unsafe control actions are added.
// This utilizes TableThree to create the tables for each controller that is in the list

class StepThree extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            hazards: ''
        }
    }

    componentDidMount() {
        // Necessary to use Firebase functions
        let firebase = require('firebase');
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
                            <Card.Title as='h4'>Add a new Controller/Decision Maker</Card.Title>
                            <AddButton user={this.props.user}  path={'Projects/' + this.props.project + '/UCA'} path2={'Projects/' + this.props.project + '/UCA/'} type='UCA'  placeholder='Controller:' header='Define a new Controller'/>
                            <div className='tooltipdown no_print'>
                                <HelpIcon fontSize="small"/>
                                <span className='tooltiptextdown'>
                                    Click on the empty cells to edit them. The delete button deletes individual cells, however, deleting all the cells in a row deletes the row
                                </span>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className='step3_body'>
                                {typeof this.state.UCA === 'undefined' ? '' :
                                    Object.keys(this.state.UCA).map((uca, index) => (
                                        <TableThree index={index+1} uca={this.state.UCA[uca].UCA_Table} hazards={this.state.hazards} uca_name={this.state.UCA[uca].UCA_Name} uca_id={uca} user={this.props.user} project={this.props.project}/>
                                    ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default StepThree;