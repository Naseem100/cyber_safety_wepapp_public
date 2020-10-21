import React from "react";
import TextInput from './TextInput';
import WriteData from "../FirebaseFunctions/WriteData";
import UpdateData from "../FirebaseFunctions/UpdateData";
import Aux from "../../hoc/_Aux";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// This component utilizes TextInput to create a form that can be used in other components like AddButton.
// Utilizes several other components for data management

class TextForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {form_list: ['form1'], sub_forms: {'1': []}};

        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleSubmitAddFunctions = this.handleSubmitAddFunctions.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleSubmitEditFunctions = this.handleSubmitEditFunctions.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyDownSub = this.handleKeyDownSub.bind(this);
    }

    handleSubmitAdd(event){
        event.preventDefault();
        let path = this.props.path;
        this.state.form_list.map(input => {
            if (this.props.type2 === 'UCA') {
                let time = Date.now();
                let data = {UCA_Name: document.getElementById(input).value}
                let name = WriteData(this.props.user, path, data, true);
                let path2 = this.props.path2 + name + '/UCA_Table';
                data = {1:{UCA_Text:'',Hazards:{'1':''}}}
                setTimeout(WriteData(this.props.user, path2, data), 100);
            } else {
                if(document.getElementById(input).value === '')
                    return ''
                else
                    WriteData(this.props.user, path, document.getElementById(input).value);
            }
        });
        this.props.submitted();
    }

    handleSubmitAddFunctions(){
        let path = this.props.path;
        this.state.form_list.map((input, index) => {
            let data = {};
            if (document.getElementById(input).value === '') {
                return '';
            } else {
                data['Funct_text'] = document.getElementById(input).value;

                if (this.state.sub_forms[index + 1].length !== 0) {

                    data['SubForms'] = {};

                    this.state.sub_forms[index + 1].map((sub, index2) => {
                        data['SubForms'][(index2 + 1)] = {};

                        if (document.getElementById(input + 'sub' + (index2 + 1)).value === '') {
                            return '';
                        }

                        data['SubForms'][(index2 + 1)]['Funct_text'] = document.getElementById(input + 'sub' + (index2 + 1)).value;
                    })
                }
                WriteData(this.props.user, path, data);
            }});
        this.props.submitted();
    }

    handleSubmitEdit(event) {
        event.preventDefault();
        let key = this.props.key_db;
        let path = this.props.path;
        let data = {};
        if(this.props.section === 'Projects')
            data = {'Project_Name': document.getElementById(this.props.text_id).value}
        else{
            data[key] = document.getElementById(this.props.text_id).value;
        }
        UpdateData(this.props.user, path, data)
        this.props.submitted();
    }

    handleSubmitEditFunctions(event) {
        event.preventDefault();
        let key = this.props.key_db;
        let path = this.props.path;
        let data = {};
        data[key] = document.getElementById(this.props.text_id).value;

        UpdateData(this.props.user, path, data)

        let new_path = this.props.path + '/SubForms'
        data = {}

        if (this.state.sub_forms[1].length !== 0) {

            let date = Date.now()

            this.state.sub_forms[1].map((sub, index2) => {

                if (document.getElementById(1 + sub).value === '') {
                    return '';
                }

                data[(index2 + 1) + date] = {};

                data[(index2 + 1) + date]['Funct_text'] = document.getElementById(1 + sub).value;
            })
            UpdateData(this.props.user, new_path, data)
        }
        this.props.submitted();
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

    render(){
         if(this.props.type === 'addButton' && this.props.type2 === 'Functions') {
            return (
                <form className="form" onSubmit={this.handleSubmitAddFunctions} autoComplete="off">
                    {this.state.form_list.map((input, index) => (
                        <Aux>
                            <div className='dropdown_container'>
                                <div className='tooltipdown'>
                                    <ArrowDownwardIcon onClick={() => this.handleSubForm(input, index+1)}/>
                                    <span className='tooltiptextdown'>
                                            Click here to create a sub-form element
                                    </span>
                                </div>
                                <TextInput onKeyDown={this.handleKeyDown} class='dropdown_text' text_id={input} value={this.props.value} placeholder={this.props.placeholder}/>
                            </div>
                            <div>
                                {this.state.sub_forms[index+1].map((sub, index2) => (
                                    <div className='dropdown_container_sub'>
                                        <TextInput class='dropdown_text' text_id={input + sub} placeholder={this.props.placeholder}
                                                   value={this.state.value} onKeyDown={this.handleKeyDownSub} index={index+1}/>
                                    </div>
                                ))}
                            </div>
                        </Aux>
                    ))}
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
        else if(this.props.type === 'addButton') {
            return (
                <form className="form" onSubmit={this.handleSubmitAdd} onKeyDown={this.handleKeyDown} autoComplete="off">
                    <span className='form_subheader'>{this.props.subheader}</span>
                    {this.state.form_list.map(input => <TextInput text_id={input} value={this.props.value}
                                                                  placeholder={this.props.placeholder}/>
                    )}
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
        else if(this.props.type === 'editButton' && (this.props.type2 === 'Functions' && !this.props.sub)){
             return (
                 <form className="form" onSubmit={this.handleSubmitEditFunctions} autoComplete="off">
                     <div className='dropdown_container margin_none'>
                         <div className='tooltipdown'>
                             <ArrowDownwardIcon onClick={() => this.handleSubForm(1, 1)}/>
                             <span className='tooltiptextdown'>
                                    Click here to create a sub-form element
                            </span>
                         </div>
                         <span className='form_subheader margin_right'>{this.props.subheader}</span>
                         <TextInput text_id={this.props.text_id} class='dropdown_text' value={this.props.value} placeholder={this.props.placeholder} />
                     </div>
                     <div>
                         {this.state.sub_forms[1].map((sub, index2) => (
                             <div className='dropdown_container_sub'>
                                 <TextInput class='dropdown_text' text_id={1 + sub} placeholder={this.props.placeholder}
                                            value={this.state.value} onKeyDown={this.handleKeyDownSub} index={1}/>
                             </div>
                         ))}
                     </div>
                     <input type="submit" className="Submit"/>
                 </form>
             );
         }
        else if(this.props.type === 'editButton'){
            return (
                <form className="form" onSubmit={this.handleSubmitEdit} autoComplete="off">
                    <div className='textform_editButton'>
                        <span className='form_subheader'>{this.props.subheader}</span>
                        <TextInput text_id={this.props.text_id} class='textform_editButton_input' value={this.props.value} placeholder={this.props.placeholder} />
                    </div>
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
        else if(this.props.type === 'addButton_Projects'){
            return (
                <form className="form" onSubmit={this.handleSubmitAdd} autoComplete="off">
                    <span className='form_subheader'>{this.props.subheader}</span>
                    {this.state.form_list.map(input => <TextInput text_id={input} value={this.props.value}
                                                                  placeholder={this.props.placeholder}/>
                    )}
                    <input type="submit" className="Submit"/>
                </form>
            );
        }
    }
}

export default TextForm;