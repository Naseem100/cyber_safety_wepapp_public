import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from "@material-ui/icons/Edit";
import Popup from "reactjs-popup";
import DropDownForm from "./DropDownForm";
import WriteData from "../FirebaseFunctions/WriteData";
import DeleteButton from "../Buttons/DeleteButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditButton from "../Buttons/EditButton";
import {Row, Col, Card} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import TextInput from "./TextInput";
import UpdateData from "../FirebaseFunctions/UpdateData";
import AddButton from "../Buttons/AddButton";
import manual from "../../assets/CyberSafetyManual_SK2.pdf";
import HelpIcon from "@material-ui/icons/Help";

// This component is used in Step Four and will basically build the table that includes the Scenarios,
// Associated Causal Factors, and Security Constraints as columns.
// Utilizes several other components for the buttons and data management

class TableFour extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.Foo = {};

        this.state = {
            open_body: false,
            display_body: 'none',
            popup: false,
            popup_diagram: false,
            column: 1,
            name: '',
            value: '',
            pos: {x: '35%', y: '35%'},
            pos_diagram: {x: '35%', y: '35%'},
            dragging: false,
            rel: null,
            dragging_diagram: false,
            rel_diagram: null
        }

        this.toggleTable = this.toggleTable.bind(this);
        this.toggleBody = this.toggleBody.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalDiagram = this.openModalDiagram.bind(this);
        this.closeModalDiagram = this.closeModalDiagram.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.addRow = this.addRow.bind(this);
        this.acceptMethods = this.acceptMethods.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDownDiagram = this.onMouseDownDiagram.bind(this);
        this.onMouseMoveDiagram = this.onMouseMoveDiagram.bind(this);
        this.onMouseUpDiagram = this.onMouseUpDiagram.bind(this);

    }

    toggleTable(item) {
        if(this.state[item + 'open']) {
            this.setState({
                [item + 'open']: !this.state[item + 'open'],
                [item]: 'none'
            })
        } else if(this.state[item + 'open'] === false){
            this.setState({
                [item + 'open']: !this.state[item + 'open'],
                [item]: 'block'
            })
        } else {
            this.setState({
                [item + 'open']: true,
                [item]: 'block'
            })
        }
    }

    toggleBody() {
        if(this.state.open_body) {
            this.setState({
                open_body: !this.state.open_body,
                display_body: 'none'
            })
        } else{
            this.setState({
                open_body: !this.state.open_body,
                display_body: 'block'
            })
        }
    }

    addRow(scenario_path) {
        let path = 'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + scenario_path;
        let data = {Scenario_Header:'',Scenario_Text:''}
        WriteData(this.props.user, path, data);
    }

    openModal(event, row, col, scenario) {
        if((event.target.className === 'step4_columns center' && event.target.className !== 'deleteButton') || event.target.className === 'step4_columns center' || event.target.className === 'step4_scenario_header' || event.target.className === 'step4_scenario_body')
            this.setState({ popup: true, row: row, col: col, scenario: scenario, Scenario_Header: typeof this.props.UCA.UCA_Table[row][col].Scenarios === 'undefined' ? '' : this.props.UCA.UCA_Table[row][col].Scenarios[scenario].Scenario_Header, Scenario_Text: typeof this.props.UCA.UCA_Table[row][col].Scenarios === 'undefined' ? '' : this.props.UCA.UCA_Table[row][col].Scenarios[scenario].Scenario_Text})
    }

    closeModal() {
        this.setState({ popup: false,
            pos: {
                x: '35%',
                y: '35%'
            }
        })
    }

    openModalDiagram(event, row, col, scenario) {
        this.setState({ popup_diagram: true,})
    }

    closeModalDiagram() {
        this.setState({ popup: false,
            pos_diagram: {
                x: '35%',
                y: '35%'
            }
        })
    }

    handleTag(haz) {
        try {
            let indexTag = Object.keys(this.props.hazards).indexOf(haz);
            let indexSubTag = Object.keys(this.props.hazards).indexOf(haz.split(':')[0]);

            if (indexTag > -1) {
                return (
                    <span className='related_haz_UCA tooltipright'>
                        {'H-' + (indexTag+1)}
                        <span className='tooltiptextright'>
                            {(this.props.hazards[haz].Haz_text)}
                        </span>
                    </span>
                )
            }else if(indexSubTag > -1) {
                return (
                    <span className='related_haz_UCA tooltipright'>
                        {'H-' + (indexSubTag+1) + '.' + haz.split(':')[1]}
                        <span className='tooltiptextright'>
                            {(this.props.hazards[haz.split(':')[0]].SubForms[haz.split(':')[1]].Haz_text)}
                        </span>
                    </span>
                )
            }
        }
        catch(err) {
            console.log(err)
        }

    }

    handleSubmitEdit() {
        let path = 'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + this.state.row + '/' + this.state.col + '/Scenarios/' + this.state.scenario;
        let data = {
            Scenario_Header: document.getElementById(this.state.scenario + 1).value,
            Scenario_Text: document.getElementById(this.state.scenario + 2).value
        };
        UpdateData(this.props.user, path, data)
        this.closeModal();
    }

    acceptMethods(openModal, value) {
        // Parent stores the method that the child passed
        this.Foo[value] = openModal;
    }

    onMouseDown(e) {
        if (e.button !== 0) return
        var pos = e.target.getBoundingClientRect();
        this.setState({
            dragging: true,
            rel: {
                x: e.pageY - pos.top,
                y: e.pageX - pos.left
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseUp(e) {
        this.setState({dragging: false})
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseMove(e) {
        if (!this.state.dragging) return
        this.setState({
            pos: {
                x: e.pageY - this.state.rel.x + 'px',
                y: e.pageX - this.state.rel.y + 'px'
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseDownDiagram(e) {
        if (e.button !== 0) return
        var pos = e.target.getBoundingClientRect();
        this.setState({
            dragging_diagram: true,
            rel_diagram: {
                x: e.pageY - pos.top,
                y: e.pageX - pos.left
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseUpDiagram(e) {
        this.setState({dragging_diagram: false})
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseMoveDiagram(e) {
        if (!this.state.dragging_diagram) return
        this.setState({
            pos_diagram: {
                x: e.pageY - this.state.rel_diagram.x + 'px',
                y: e.pageX - this.state.rel_diagram.y + 'px'
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }


    componentDidUpdate(props, state, snapshot) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
        if (this.state.dragging_diagram && !state.dragging_diagram) {
            document.addEventListener('mousemove', this.onMouseMoveDiagram)
            document.addEventListener('mouseup', this.onMouseUpDiagram)
        } else if (!this.state.dragging_diagram && state.dragging_diagram) {
            document.removeEventListener('mousemove', this.onMouseMoveDiagram)
            document.removeEventListener('mouseup', this.onMouseUpDiagram)
        }
    }

    // Test code that might be useful in the near future
    /*
    <div className='tooltipright'>
        <HelpIcon fontSize="small" color={'action'} onClick={this.openModalDiagram}/>
        <span className='tooltiptextright'>
        Click here to download the cybersecurity web tool manual
        </span>
    </div>
    <Popup
        open={this.state.popup_diagram} onClose={this.closeModalDiagram} modal contentStyle={{ position: 'absolute', top: this.state.pos_diagram.x, left: this.state.pos_diagram.y }}>
        HELLLLO
    </Popup>
     */


    render() {
        try {
            let uca_index = 1;
            return (
                <Row>
                    <Col className='step4_content_card'>
                        <Card>
                            <Card.Header onClick={this.toggleBody} style={{ cursor: 'pointer' }} className='step4_content_card_header'>
                                <Card.Title as='h5'>
                                    <div className='step4_p'> <span className='step3_Ctrl_number'>{this.props.index}</span> {this.props.uca_name} </div>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body style={{display: this.state.display_body}}>
                                {Object.keys(this.props.UCA.UCA_Table).map((row, index2) => (
                                Object.keys(this.props.UCA.UCA_Table[row]).map((uca, index3) => (
                                <Row>
                                    <Col>
                                        <Card className='step4_content_card'>
                                            <Card.Header className='step4_content_card_header'>
                                                <Card.Title as='h5'>
                                                    <div className='step4_UCA'>
                                                        <div className='step4_header_top' onClick={() => this.toggleTable(row+uca)}>
                                                            <div className='step4_header_top_UCA' onClick={() => this.toggleTable(row+uca)}>UCA-{uca_index++}: </div>
                                                            <div className='step4_header_bottom'>
                                                                {this.props.UCA.UCA_Table[row][uca].UCA_Text}
                                                                <div className='step4_cell_tag'>
                                                                    {(typeof this.props.UCA.UCA_Table[row][uca] === 'undefined') ? '' :
                                                                        (typeof this.props.UCA.UCA_Table[row][uca].Hazards === 'undefined' ? '' :
                                                                            (Object.keys(this.props.UCA.UCA_Table[row][uca].Hazards)).map((haz, index) => (
                                                                            this.handleTag(haz)
                                                                        )))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Title>
                                            </Card.Header>
                                            <Card.Body style={{ display: (typeof this.state[row+uca] === 'undefined' ? 'none' : this.state[row+uca]) }}>
                                                <div className='step4'>
                                                    <div style={{ width: '100%' }}>
                                                        <table className='step4_table' style={{width: '100%', display: 'inline-table'}}>
                                                            <thead>
                                                            <tr>
                                                                <th className='step4_table_headers first_col'>
                                                                    #
                                                                </th>
                                                                <th className='step4_table_headers'>
                                                                    Scenarios
                                                                </th>
                                                                <th className='step4_table_headers'>
                                                                    Associated Causal Factors
                                                                </th>
                                                                <th className='step4_table_headers'>
                                                                    Safety/Security Constraints
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {typeof this.props.UCA.UCA_Table[row][uca].Scenarios === 'undefined' ?
                                                                <tr>
                                                                    <td  className='step4_columns first_col'>
                                                                    </td>
                                                                    <td className='step4_columns'>
                                                                    </td>
                                                                </tr>
                                                                :
                                                                Object.keys(this.props.UCA.UCA_Table[row][uca].Scenarios).map((scenario, index4) => (
                                                                    <tr>
                                                                        <td className='step4_columns center first_col' >
                                                                            <div>{index4 + 1}</div>
                                                                        </td>
                                                                        <td className='step4_columns center' onClick={(event,props) => this.openModal(event,row, uca, scenario)}>
                                                                            <div className='step4_scenario_header'>{this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Scenario_Header}</div>
                                                                            <div className='step4_scenario_body'>{this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Scenario_Text === '' ? (<AddIcon style={{ color: '#c2c2ca', margin: '12px 0 0 0' }} fontSize="large"/>) : this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Scenario_Text}</div>
                                                                            <div className='margin_top_auto'>
                                                                                <DeleteButton user={this.props.user} project={this.props.project}
                                                                                              path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios'} key_db={scenario}
                                                                                              type='Functions' name={scenario} fontSize='small'/>
                                                                            </div>
                                                                        </td>
                                                                        <td className='step4_columns center'>
                                                                            {typeof this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Causal_Factors === 'undefined' ?
                                                                                ''
                                                                                :
                                                                                Object.keys(this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Causal_Factors).map((cause, index5) => (
                                                                                    <div className='step4_list_cell'>
                                                                                        <div className='step4_list_cell_div' onClick={() => this.Foo[this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Causal_Factors[cause]]()}>{(index5 + 1)}. {this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Causal_Factors[cause]}</div>
                                                                                        <div className='flex'>
                                                                                            <EditButton user={this.props.user} project={this.props.project}
                                                                                                        setClick={this.acceptMethods}
                                                                                                        path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios/' + scenario + '/Causal_Factors'} key_db={cause}
                                                                                                        text_id={cause} subheader={(index5 + 1) + ':'} type='Losses'
                                                                                                        value={this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Causal_Factors[cause]}
                                                                                                        header='Edit Causal Factor' fontSize='small'/>
                                                                                            <DeleteButton user={this.props.user} project={this.props.project}
                                                                                                          path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios/' + scenario + '/Causal_Factors'} key_db={cause}
                                                                                                          type='Functions' name={cause} fontSize='small'/>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            <div className='margin_top_auto'>
                                                                                <AddButton id='add_button' user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios/' + scenario + '/Causal_Factors'} fontSize='small' prefix='' type='Losses' placeholder='Factor:' header='Add a new Causal Factor'/>
                                                                            </div>
                                                                        </td>
                                                                        <td className='step4_columns center'>
                                                                            {typeof this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Security_Constraints === 'undefined' ?
                                                                                ''
                                                                                :
                                                                                Object.keys(this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Security_Constraints).map((security, index6) => (
                                                                                    <div className='step4_list_cell'>
                                                                                        <div className='step4_list_cell_div' onClick={() => this.Foo[this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Security_Constraints[security]]()}>{(index6 + 1)}. {this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Security_Constraints[security]}</div>
                                                                                        <div className='flex'>
                                                                                            <EditButton user={this.props.user} project={this.props.project}
                                                                                                        setClick={this.acceptMethods}
                                                                                                        path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios/' + scenario + '/Security_Constraints'} key_db={security}
                                                                                                        text_id={security} subheader={(index6 + 1) + ':'} type='Losses'
                                                                                                        value={this.props.UCA.UCA_Table[row][uca].Scenarios[scenario].Security_Constraints[security]}
                                                                                                        header='Edit Security Constraint' fontSize='small'/>
                                                                                            <DeleteButton user={this.props.user} project={this.props.project}
                                                                                                          path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios/' + scenario + '/Security_Constraints'} key_db={security}
                                                                                                          type='Functions' name={security} fontSize='small'/>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            <div className='margin_top_auto'>
                                                                                <AddButton id='add_button' user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + row + '/' + uca + '/Scenarios/' + scenario + '/Security_Constraints'} fontSize='small' prefix='' type='Losses' placeholder='Security Constraint:' header='Add a new Security Constraint'/>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        <div className='step4_add_row no_print' onClick={() => this.addRow(row + '/' + uca + '/Scenarios')}>
                                                            <AddIcon fontSize="large"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                ))))}
                                <div className='editButton'>
                                    <Popup
                                        open={this.state.popup} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                                            {'Edit Scenario'}
                                        </p>
                                        <form className="form" onSubmit={this.handleSubmitEdit}>
                                            <div className='textform_editButton'>
                                                <span className='form_subheader'>Header: </span>
                                                <TextInput text_id={this.state.scenario + 1} class='textform_editButton_input' list='list' value={this.state.Scenario_Header}/>
                                                <datalist id = 'list'>
                                                    <option value='Malformed Control Algorithm'></option>
                                                    <option value='Manufactured commands sent to actuator'></option>
                                                    <option value='Incorrect input from higher level controller'></option>
                                                    <option value='Unauthorized changes to Control Algorithm'></option>
                                                </datalist>
                                            </div>
                                            <div className='textform_editButton'>
                                                <span className='form_subheader'>Scenario: </span>
                                                <TextInput text_id={this.state.scenario + 2} class='textform_editButton_input' value={this.state.Scenario_Text}/>
                                            </div>
                                            <input type="submit" className="Submit"/>
                                        </form>
                                    </Popup>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            );
        } catch (error) {
            alert(error.message);
            return '';
        }
    }
}

export default TableFour;