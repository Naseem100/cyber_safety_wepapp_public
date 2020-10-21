import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Popup from "reactjs-popup";
import DropDownForm from "./DropDownForm";
import WriteData from "../FirebaseFunctions/WriteData";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import {Row, Col, Card} from 'react-bootstrap';
import DeleteData from "../FirebaseFunctions/DeleteData";

// This component is used in Step Three and will basically build the table that includes Not Providing Causes Hazards,
// Providing Causes Hazards, Too Soon, Too Late, or Out-of-Order, and Stopped too soon, Applied too long as columns.
// Utilizes several other components for the buttons and data management

class TableThree extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            display: 'none',
            popup: false,
            column: 1,
            name: '',
            value: '',
            pos: {x: '35%', y: '35%'},
            dragging: false,
            rel: null,
            new_row: false,
            display_new_row: 'none'
        }

        this.toggleTable = this.toggleTable.bind(this);
        this.openModalAdd = this.openModalAdd.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addRow = this.addRow.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    toggleTable() {
        if(this.state.open) {
            this.setState({
                open: !this.state.open,
                display: 'none'
            })
        } else{
            this.setState({
                open: !this.state.open,
                display: 'block'
            })
        }
    }

    addRow() {
        if(this.state.new_row) {
            this.setState({
                new_row: !this.state.new_row,
                display_new_row: 'none'
            })
        } else{
            this.setState({
                new_row: !this.state.new_row,
                display_new_row: 'flex'
            })
        }
    }

    openModalAdd(event, num) {
        let path = 'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table';
        let data = {[num]:{UCA_Text:'',Hazards:{'1':''}}}
        let name = WriteData(this.props.user, path, data, true);
        this.setState({ popup: true, column: num, name: name, value: '', new_row: false, display_new_row: 'none'})
    }

    openModal(event, num, name) {
        if((event.target.className === 'step3_cell_row' && event.target.className !== 'deleteButton') || event.target.className === 'step3_columns' || event.target.className === 'step3_table_contents' || event.target.className === 'step3_cell_tag' || event.target.className === 'related_haz_UCA' || event.target.className.animVal === 'MuiSvgIcon-root MuiSvgIcon-fontSizeLarge') {
            this.setState({ popup: true, column: num, name: name, value: typeof this.props.uca[name][num] === 'undefined' ? '' : this.props.uca[name][num].UCA_Text})
        }
    }

    closeModal() {
        this.setState({ popup: false,
            pos: {
                x: '35%',
                y: '35%'
            }
        })
    }

    handleTag(haz, obj, num, index) {
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

    onMouseDown(e) {
        if (e.button !== 0) return
        var pos = e.target.getBoundingClientRect();
        console.log([e.pageX - pos.left, e.pageY - pos.top])
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

    componentDidUpdate(props, state, snapshot) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    render() {
        try {
            let uca_index = 1;
            if(typeof this.props.uca === 'undefined'){
                DeleteData(this.props.user, 'Projects/' + this.props.project + '/UCA', this.props.uca_id)
            }
            return (
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <div className='step3_UCA'>
                                    <Card.Title as='h5' onClick={this.toggleTable}>
                                        <span className='step3_Ctrl_number'>{this.props.index}</span> {this.props.uca_name}
                                    </Card.Title>
                                    <div className='step3_delete_UCA_Table'>
                                        <DeleteButton user={this.props.user} project={this.props.project}
                                                      path={'Projects/' + this.props.project + '/UCA'} key_db={this.props.uca_id}
                                                      class='step3_delete_UCA' fontSize='large'/>
                                        <EditButton class='step3_edit_UCA' user={this.props.user} project={this.props.project}
                                                    path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id}
                                                    key_db={'UCA_Name'} text_id={this.props.uca_id} subheader={'Controller:'}
                                                    type='Functions' value={this.props.uca_name}
                                                    header='Edit the Controller name'/>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body style={{display: this.state.display}}>
                                <div className='flex'>
                                    <table className='step3_table'>
                                        <tbody>
                                        <tr>
                                            <th className='step3_table_headers'>
                                                Not Providing Causes Hazards
                                            </th>
                                            <th className='step3_table_headers'>
                                                Providing Causes Hazards
                                            </th>
                                            <th className='step3_table_headers'>
                                                Too Soon, Too Late, or Out-of-Order
                                            </th>
                                            <th className='step3_table_headers'>
                                                Stopped too soon, Applied too long
                                            </th>
                                        </tr>
                                        {Object.keys(this.props.uca).map((obj, index) => (
                                            <div>
                                                <tr>
                                                    <td className='step3_columns' onClick={(event) => this.openModal(event, 1, obj)}>
                                                        {(typeof this.props.uca[obj][1] === 'undefined') ?
                                                            <div className='cell_addition'>
                                                                <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                            </div>
                                                            :
                                                            (<div className='step3_table_contents'>
                                                                <div className='step3_table_index'>{'UCA-' + uca_index++}</div>
                                                                {this.props.uca[obj][1].UCA_Text === '' ? <AddIcon style={{ color: '#c2c2ca', marginLeft: 'calc(50% - .5em)' }} fontSize="large"/> : this.props.uca[obj][1].UCA_Text}
                                                            </div>)}
                                                        <div className='step3_cell_row'>
                                                            <div className='step3_cell_tag'>
                                                                {(typeof this.props.uca[obj][1] === 'undefined') ? '' :
                                                                    (typeof this.props.uca[obj][1].Hazards === 'undefined' ? '' :
                                                                        (Object.keys(this.props.uca[obj][1].Hazards)).map((haz, index) => (
                                                                        this.handleTag(haz, obj, 1, index)
                                                                    )))}
                                                            </div>
                                                            {(typeof this.props.uca[obj][1] === 'undefined') ? '' :
                                                                <DeleteButton user={this.props.user}
                                                                              project={this.props.project}
                                                                              path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + obj}
                                                                              key_db={1} class='step3_delete_UCA'
                                                                              fontSize='small'/>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className='step3_columns' onClick={(event) => this.openModal(event, 2, obj)}>
                                                        {(typeof this.props.uca[obj][2] === 'undefined') ?
                                                            <div className='cell_addition'>
                                                                <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                            </div>
                                                            :
                                                            (<div className='step3_table_contents'>
                                                                <div className='step3_table_index'>{'UCA-' + uca_index++}</div>
                                                                {this.props.uca[obj][2].UCA_Text === '' ? <AddIcon style={{ color: '#c2c2ca', marginLeft: 'calc(50% - .5em)' }} fontSize="large"/> : this.props.uca[obj][2].UCA_Text}
                                                            </div>)}
                                                        <div className='step3_cell_row'>
                                                            <div className='step3_cell_tag'>
                                                                {(typeof this.props.uca[obj][2] === 'undefined') ? '' :
                                                                    (typeof this.props.uca[obj][2].Hazards === 'undefined' ? '' :
                                                                        (Object.keys(this.props.uca[obj][2].Hazards)).map((haz, index) => (
                                                                        this.handleTag(haz, obj, 2, index)
                                                                    )))}
                                                            </div>
                                                            {(typeof this.props.uca[obj][2] === 'undefined') ? '' :
                                                                <DeleteButton user={this.props.user}
                                                                              project={this.props.project}
                                                                              path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + obj}
                                                                              key_db={2} class='step3_delete_UCA'
                                                                              fontSize='small'/>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className='step3_columns' onClick={(event) => this.openModal(event, 3, obj)}>
                                                        {(typeof this.props.uca[obj][3] === 'undefined') ?
                                                            <div className='cell_addition'>
                                                                <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                            </div>
                                                            :
                                                            (<div className='step3_table_contents'>
                                                                <div className='step3_table_index'>{'UCA-' + uca_index++}</div>
                                                                {this.props.uca[obj][3].UCA_Text === '' ? <AddIcon style={{ color: '#c2c2ca', marginLeft: 'calc(50% - .5em)' }} fontSize="large"/> : this.props.uca[obj][3].UCA_Text}
                                                            </div>)}
                                                        <div className='step3_cell_row'>
                                                            <div className='step3_cell_tag'>
                                                                {(typeof this.props.uca[obj][3] === 'undefined') ? '' :
                                                                    (typeof this.props.uca[obj][3].Hazards === 'undefined' ? '' :
                                                                        (Object.keys(this.props.uca[obj][3].Hazards)).map((haz, index) => (
                                                                        this.handleTag(haz, obj, 3, index)
                                                                    )))}
                                                            </div>
                                                            {(typeof this.props.uca[obj][3] === 'undefined') ? '' :
                                                                <DeleteButton user={this.props.user}
                                                                              project={this.props.project}
                                                                              path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + obj}
                                                                              key_db={3} class='step3_delete_UCA'
                                                                              fontSize='small'/>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className='step3_columns' onClick={(event) => this.openModal(event, 4, obj)}>
                                                        {(typeof this.props.uca[obj][4] === 'undefined') ?
                                                            <div className='cell_addition'>
                                                                <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                            </div>
                                                            :
                                                            (<div className='step3_table_contents'>
                                                                <div className='step3_table_index'>{'UCA-' + uca_index++}</div>
                                                                {this.props.uca[obj][4].UCA_Text === '' ? <AddIcon style={{ color: '#c2c2ca', marginLeft: 'calc(50% - .5em)' }} fontSize="large"/> : this.props.uca[obj][4].UCA_Text}
                                                            </div>)}
                                                        <div className='step3_cell_row'>
                                                            <div className='step3_cell_tag'>
                                                                {(typeof this.props.uca[obj][4] === 'undefined') ? '' :
                                                                    (typeof this.props.uca[obj][4].Hazards === 'undefined' ? '' :
                                                                        (Object.keys(this.props.uca[obj][4].Hazards)).map((haz, index) => (
                                                                        this.handleTag(haz, obj, 4, index)
                                                                    )))}
                                                            </div>
                                                            {(typeof this.props.uca[obj][4] === 'undefined') ? '' :
                                                                <DeleteButton user={this.props.user}
                                                                              project={this.props.project}
                                                                              path={'Projects/' + this.props.project + '/UCA/' + this.props.uca_id + '/UCA_Table/' + obj}
                                                                              key_db={4} class='step3_delete_UCA'
                                                                              fontSize='small'/>
                                                            }
                                                        </div>

                                                    </td>
                                                </tr>
                                            </div>
                                        ))}
                                        <tr style={ {display: this.state.display_new_row} }>
                                            <td className='step3_columns' onClick={(event) => this.openModalAdd(event, 1)}>
                                                <div className='cell_addition'>
                                                    <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                </div>
                                            </td>
                                            <td className='step3_columns' onClick={(event) => this.openModalAdd(event, 2)}>
                                                <div className='cell_addition'>
                                                    <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                </div>
                                            </td>
                                            <td className='step3_columns' onClick={(event) => this.openModalAdd(event, 3)}>
                                                <div className='cell_addition'>
                                                    <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                </div>
                                            </td>
                                            <td className='step3_columns' onClick={(event) => this.openModalAdd(event, 4)}>
                                                <div className='cell_addition'>
                                                    <AddIcon style={{ color: '#c2c2ca' }} fontSize="large"/>
                                                </div>
                                            </td>
                                        </tr>
                                        <div className='editButton'>
                                            <Popup
                                                open={this.state.popup} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                                                <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                                                    {'Edit UCA'}
                                                </p>
                                                <DropDownForm dropID={this.state.name + this.state.column} user={this.props.user}
                                                              submitted={this.closeModal} key_text={'UCA_Text'}
                                                              key_db={this.props.uca_id + '/UCA_Table/' + this.state.name + '/' + this.state.column}
                                                              type='editButton' placeholder={'UCA Description:'}
                                                              related_tags={'Hazards'} path={'Projects/' + this.props.project + '/UCA'}
                                                              subheader={'UCA:'} value={this.state.value}
                                                              options={this.props.hazards}/>
                                            </Popup>
                                        </div>
                                        </tbody>
                                    </table>
                                    <div className='step3_add_row no_print' onClick={this.addRow}>
                                        <AddCircleIcon style={{ fontSize: 30 }}/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            );
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}

export default TableThree;