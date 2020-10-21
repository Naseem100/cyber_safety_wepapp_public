import EditButton from "../Buttons/EditButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React from "react";
import UpdateData from "../FirebaseFunctions/UpdateData";
import EditIcon from "@material-ui/icons/Edit";
import Popup from "reactjs-popup";
import TextInput from "./TextInput";

// This is a react component used in Step 1 that will produce the interface for the goals part of the step.
// Utilizes several other components for the buttons and data management

class Goal extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = { open: false };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event, goals){
        if(event.key === 'Enter'){
            let key = goals;
            let path = 'Projects/' + this.props.project + '/Goals';
            let data = {
                'To': document.getElementById('To').value,
                'By': document.getElementById('By').value,
                'Using': document.getElementById('Using').value
            };
            UpdateData(this.props.user, path, data);
        }
    }

    openModal() {
        this.setState({ open: true })
    }

    closeModal() {
        this.setState({ open: false })
    }

    handleSubmitEdit() {
        let path = 'Projects/' + this.props.project + '/Goals';
        let data = {
            'To': document.getElementById('To').value,
            'By': document.getElementById('By').value,
            'Using': document.getElementById('Using').value
        };
        UpdateData(this.props.user, path, data)
        this.closeModal();
    }

    render() {
        try {
            return (
                <div className='goal_parent'>
                    <div className='goal'>
                        <div className='goal_box To'>
                            <span className='goal_box_text'>To <br/> (Do What) </span>
                        </div>
                        <div className='goal_desc'>
                            {this.props.edit_mode ?
                                <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, 'To')}>
                                    <textarea id='To' className='goal_desc_form_text'>{this.props.goals.To}</textarea>
                                </form> :
                                <div className='goal_desc_text' onClick={this.openModal}>{this.props.goals.To}</div>
                            }
                            <div className='goal_edit'>
                                {this.props.edit_mode ? '' :
                                    <div className='editButton no_print'>
                                        <EditIcon onClick={this.openModal}/>
                                        <Popup
                                            open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick>
                                            <p className='modal_header'>What is the Goal/Mission of the System?</p>
                                            <form className="form" onSubmit={this.handleSubmitEdit}>
                                                <div className='textform_editButton'>
                                                    <span className='form_subheader'>To: </span>
                                                    <TextInput text_id='To' class='textform_editButton_input' value={(typeof this.props.goals.To === 'undefined') ? 'To ...' : this.props.goals.To}/>
                                                </div>
                                                <div className='textform_editButton'>
                                                    <span className='form_subheader'>By: </span>
                                                    <TextInput text_id='By' class='textform_editButton_input' value={(typeof this.props.goals.By === 'undefined') ? 'By ...' : this.props.goals.By}/>
                                                </div>
                                                <div className='textform_editButton'>
                                                    <span className='form_subheader'>Using:</span>
                                                    <TextInput text_id='Using' class='textform_editButton_input' value={(typeof this.props.goals.Using === 'undefined') ? 'Using ...' : this.props.goals.Using}/>
                                                </div>
                                                <input type="submit" className="Submit"/>
                                            </form>
                                        </Popup>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='goal_arrow_parent_By'>
                        <ArrowDownwardIcon className='goal_arrow'/>
                    </div>
                    <div className='goal'>
                        <div className='goal_box By'>
                            <span className='goal_box_text'>By <br/> (How)</span>
                        </div>
                        <div className='goal_desc'>
                            {this.props.edit_mode ?
                                <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, 'By')}>
                                    <textarea id='By' className='goal_desc_form_text'>{this.props.goals.By}</textarea>
                                </form> :
                                <div className='goal_desc_text' onClick={this.openModal}>{this.props.goals.By}</div>
                            }
                        </div>
                    </div>
                    <div className='goal_arrow_parent_Using'>
                        <ArrowDownwardIcon className='goal_arrow'/>
                    </div>
                    <div className='goal'>
                        <div className='goal_box Using'>
                            <span className='goal_box_text'>Using</span>
                        </div>
                        <div className='goal_desc'>
                            {this.props.edit_mode ?
                                <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, 'Using')}>
                                    <textarea id='Using'
                                              className='goal_desc_form_text'>{this.props.goals.Using}</textarea>
                                </form> :
                                <div className='goal_desc_text' onClick={this.openModal}>{this.props.goals.Using}</div>
                            }
                        </div>
                    </div>
                </div>
            );
        } catch (error) {
            console.log(error);
            return ''
        }
    }
}

export default Goal;