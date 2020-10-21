import React from "react";
import WriteData from "../FirebaseFunctions/WriteData";
import UpdateData from "../FirebaseFunctions/UpdateData";
import DropDown from './DropDown';
import TextForm from "./TextForm";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TextInput from "./TextInput";
import $ from 'jquery';
import Aux from "../../hoc/_Aux";
import HelpIcon from "@material-ui/icons/Help";

// This component utilizes DropDown to create a form that can be used in other components like AddButton.
// Utilizes several other components for data management

class DropDownForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {form_list: ['form1'], sub_forms: {'1': []}};

        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleSubmitEditWithSub = this.handleSubmitEditWithSub.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyDownSub = this.handleKeyDownSub.bind(this);
        this.handleSubForm = this.handleSubForm.bind(this);
    }

    handleSubmitAdd(){
        let path = this.props.path;
        this.state.form_list.map(function(input, index) {
            let data = {};
            if (document.getElementById(input).value === '') {
                return '';
            } else {
                data[this.props.key_text] = document.getElementById(input).value;

                if(this.state.sub_forms[index+1].length !== 0) {
                    data['SubForms'] = {};

                    this.state.sub_forms[index+1].map((sub, index2) => {
                        data['SubForms'][(index2 + 1)] = {};

                        data['SubForms'][(index2 + 1)][this.props.key_text] = document.getElementById(input + 'sub' + (index2 + 1)).value;

                        const sub_tags = ($('#' + input + 'dropsub' + (index2 + 1)).val() + '').split(",");
                        if(sub_tags[0] !== '') {
                            data['SubForms'][(index2 + 1)][this.props.related_tags] = {};
                            for (const key of sub_tags) {
                                data['SubForms'][(index2 + 1)][this.props.related_tags][key] = key;
                            }
                        }
                    })
                }

                const tags = ($('#drop'+input).val()+'').split(",");
                if(tags[0] !== '') {
                    data[this.props.related_tags] = {};
                    for (const key of tags) {
                        data[this.props.related_tags][key] = key;
                    }
                }
                WriteData(this.props.user, path, data);
            }
        },this);
        this.props.submitted();
    }

    handleSubmitEdit(event) {
        let path = this.props.path + '/' + this.props.key_db;
        let data = {};
        data[this.props.key_text] = document.getElementById('form1').value;
        const tags = ($('#dropform1').val()+'').split(",");
        if(tags[0] !== '') {
            data[this.props.related_tags] = {};
            for (const key of tags) {
                data[this.props.related_tags][key] = key;
            }
        }
        UpdateData(this.props.user, path, data);
        this.props.submitted();
        event.preventDefault();
    }

    handleSubmitEditWithSub(event) {
        let path = this.props.path + '/' + this.props.key_db;
        let data = {};
        data[this.props.key_text] = document.getElementById('form1').value;

        const tags = ($('#dropform1').val()+'').split(",");
        if(tags[0] !== '') {
            data[this.props.related_tags] = {};
            for (const key of tags) {
                data[this.props.related_tags][key] = key;
            }
        }
        UpdateData(this.props.user, path, data);

        let new_path = this.props.path + '/' + this.props.key_db + '/SubForms'
        data = {}

        if(this.state.sub_forms[1].length !== 0) {

            let date = Date.now();

            this.state.sub_forms[1].map((sub, index2) => {
                data[(index2 + 1) + date] = {};

                if (document.getElementById(sub).value === '') {
                    return '';
                }

                data[(index2 + 1) + date][this.props.key_text] = document.getElementById(sub).value;

                const sub_tags = ($('#drop' + sub).val() + '').split(",");
                if (sub_tags[0] !== '') {
                    data[(index2 + 1) + date][this.props.related_tags] = {};
                    for (const key of sub_tags) {
                        data[(index2 + 1) + date][this.props.related_tags][key] = key;
                    }
                }
            })
            UpdateData(this.props.user, new_path, data);
        }
        this.props.submitted();
        event.preventDefault();
    }

    handleKeyDown(event, index){
        if(event.keyCode === 9){
            var newInput =`form${this.state.form_list.length+1}`;
            const { sub_forms } = { ...this.state };
            const current_state = sub_forms;
            current_state[this.state.form_list.length+1] = [];
            this.setState(prevState => ({
                form_list: prevState.form_list.concat([newInput]),
                sub_forms: current_state
            }));
        }
    }

    handleKeyDownSub(event, index){
        if(event.keyCode === 9){
            var newInput = `sub${this.state.sub_forms[index].length+1}`;
            const { sub_forms } = { ...this.state };
            const current_state = sub_forms;
            current_state[index] = current_state[index].concat(newInput);
            this.setState(prevState => ({
                sub_forms: current_state
            }));
        }
    }

    handleSubForm(input, index){
        var newInput = `sub${this.state.sub_forms[index].length+1}`;
        const { sub_forms } = { ...this.state };
        const current_state = sub_forms;
        current_state[index] = current_state[index].concat(newInput);
        this.setState(prevState => ({
            sub_forms: current_state
        }));
    }

    render() {
            if(this.props.type === 'addButton') {
            return (
                <form className="form" onSubmit={this.handleSubmitAdd} autoComplete="off">
                    {(this.state.form_list).map((input, index) => (
                        <Aux>
                            <div className='dropdown_container'>
                                <div className='tooltipdown'>
                                    <ArrowDownwardIcon onClick={() => this.handleSubForm(input, index+1)}/>
                                    <span className='tooltiptextdown'>
                                        Click here to create a sub-form element
                                    </span>
                                </div>
                                <span className='form_subheader'>{this.props.subheader}</span>
                                <TextInput class='dropdown_text' text_id={input} placeholder={this.props.placeholder}
                                           value={this.state.value} onKeyDown={this.handleKeyDown}/>
                                <DropDown path={this.props.placeholder} options={this.props.options} dropID={'drop' + input}/>
                            </div>
                            <div>
                                {this.state.sub_forms[index+1].map((sub, index2) => (
                                    <div className='dropdown_container_sub'>
                                        <TextInput class='dropdown_text' text_id={input + sub} placeholder={this.props.placeholder}
                                                   value={this.state.value} onKeyDown={this.handleKeyDownSub} index={index+1}/>
                                        <DropDown path={this.props.placeholder} options={this.props.options} dropID={input + 'drop' + sub}/>
                                    </div>
                                ))}
                            </div>
                        </Aux>
                    ))}
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
        else if((this.props.type === 'editButton' && !this.props.sub) && (this.props.type2 === 'Constraints' || this.props.type2 === 'Hazards')) {
            return (
                <form className="form" onSubmit={this.handleSubmitEditWithSub} autoComplete="off">
                    <div className='dropdown_container margin_none'>
                        <div className='tooltipdown'>
                            <ArrowDownwardIcon onClick={() => this.handleSubForm(1, 1)}/>
                            <span className='tooltiptextdown'>
                                        Click here to create a sub-form element
                            </span>
                        </div>
                        <span className='form_subheader form_subheader_cons_haz'>{this.props.subheader}</span>
                        <TextInput class='dropdown_text' text_id={this.state.form_list[0]} placeholder={this.props.placeholder}
                                   value={this.props.value}/>
                        <DropDown path={this.props.placeholder} options={this.props.options} dropID={'dropform1'}/>
                    </div>
                    <div>
                        {this.state.sub_forms[1].map((sub, index2) => (
                            <div className='dropdown_container_sub'>
                                <TextInput class='dropdown_text' text_id={sub} placeholder={this.props.placeholder}
                                           value={this.state.value} onKeyDown={this.handleKeyDownSub} index={1}/>
                                <DropDown path={this.props.placeholder} options={this.props.options} dropID={'drop' + sub}/>
                            </div>
                        ))}
                    </div>
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
        else if(this.props.type === 'editButton') {
            return (
                <form className="form" onSubmit={this.handleSubmitEdit} autoComplete="off">
                        <div className='dropdown_container'>
                            <div className='dropdown_editButton'>
                                <span className='form_subheader'>{this.props.subheader}</span>
                                <div className='dropdown_editButton_textinput'>
                                    <TextInput class='dropdown_text' text_id={this.state.form_list[0]} placeholder={this.props.placeholder} value={this.props.value}/>
                                </div>
                            </div>
                            <DropDown path={this.props.placeholder} options={this.props.options} dropID={'dropform1'}/>
                        </div>
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
    }
}

export default DropDownForm;