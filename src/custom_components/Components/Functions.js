import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import React from "react";
import UpdateData from "../FirebaseFunctions/UpdateData";
import Aux from "../../hoc/_Aux";
import SwapDownButton from "../Buttons/SwapDownButton";
import SwapUpButton from "../Buttons/SwapUpButton";
import RemoveIcon from '@material-ui/icons/Remove';

// This is a react component used in Step 1 that will produce the interface for the functions part of the step.
// Utilizes several other components for the buttons and data management

class Functions extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.Foo = {};

        this.acceptMethods = this.acceptMethods.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event, funct){
        if(event.key === 'Enter'){
            let key = funct;
            let path = 'Projects/' + this.props.project + '/Functions';
            let data = {};
            data[key] = document.getElementById(key).value;
            UpdateData(this.props.user, path, data);
        }
    }

    acceptMethods(openModal, value) {
        // Parent stores the method that the child passed
        this.Foo[value] = openModal;
    }

    render() {
        let num_functs = 0;
        try {
            let keys = Object.keys(this.props.functions);
            return (
                <div className='part2_info_parent'>
                    {keys.map((funct, index) => (
                        <Aux>
                            <div className='part2_info' style={ num_functs%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                                {this.props.edit_mode ?
                                    <div className='part2_info_p_edit_mode part2_text_tag_num'><span>{(index + 1)}: </span>
                                        <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, funct)}>
                                            <textarea id={funct}
                                                      className='goal_desc_form_text'>{this.props.functions[funct].Funct_text}</textarea>
                                        </form>
                                    </div> :
                                    <div className='part2_info_p' onClick={() => this.Foo[this.props.functions[funct].Funct_text]()}>
                                        <div className='part2_info_p_2_functions'>
                                            <span className='part2_text_tag_num'>
                                                {(index + 1)}{'. '} </span>
                                            {this.props.functions[funct].Funct_text}
                                        </div>
                                    </div>
                                }
                                <DeleteButton user={this.props.user} project={this.props.project}
                                              path={'Projects/' + this.props.project + '/Functions'} key_db={funct}
                                              type='Functions' name={funct}/>
                                {this.props.edit_mode ? '' :
                                    <EditButton user={this.props.user} project={this.props.project}
                                                setClick={this.acceptMethods}
                                                path={'Projects/' + this.props.project + '/Functions/' + funct} key_db={'Funct_text'}
                                                text_id={funct} subheader={(index + 1) + ':'} type='Functions'
                                                value={this.props.functions[funct].Funct_text}
                                                header='What functions enable the System to achieve its mission?'/>
                                }
                                {this.props.edit_mode ? '' : (index+1) === keys.length ? <SwapDownButton/> : <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                                             path={'Projects/' + this.props.project + '/Functions'}
                                                                                                                             key_db={funct} key_db2={keys[index+1]}/>}
                                {this.props.edit_mode ? '' : index === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                           path={'Projects/' + this.props.project + '/Functions'}
                                                                                                           key_db={funct} key_db2={keys[index-1]}/>}
                                <span style={{ display: 'none' }}>{num_functs = num_functs + 1}</span>
                            </div>
                        {(typeof this.props.functions[funct].SubForms !== 'undefined') ? Object.keys(this.props.functions[funct].SubForms).map((sub,index2) => (
                            <div className='part2_info' style={ (num_functs%2 === 0) ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                                {this.props.edit_mode ?
                                    <div className='part2_info_p_edit_mode part2_text_tag_num'><span>{(index + 1) + '.' + (index2 + 1)} : </span>
                                        <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, funct)}>
                                            <textarea id={funct + sub}
                                                      className='goal_desc_form_text'>{this.props.functions[funct].SubForms[sub].Funct_text}</textarea>
                                        </form>
                                    </div> :
                                    <div className='part2_info_p' onClick={() => this.Foo[this.props.functions[funct].SubForms[sub].Funct_text]()}>
                                        <div >
                                            <RemoveIcon style={ { color: 'rgb(185 185 185)'} }/>
                                            <span className='part2_text_tag_num'>
                                                {(index + 1) + '.' + (index2 + 1) + ". "}
                                            </span>
                                            <span className='part2_info_p_text'>{this.props.functions[funct].SubForms[sub].Funct_text} </span>
                                        </div>
                                    </div>
                                }
                                <DeleteButton user={this.props.user} project={this.props.project}
                                              path={'Projects/' + this.props.project + '/Functions/' + funct + '/SubForms'} key_db={sub}
                                              type='Functions' name={funct}/>
                                {this.props.edit_mode ? '' :
                                    <EditButton user={this.props.user} project={this.props.project}
                                                setClick={this.acceptMethods}
                                                path={'Projects/' + this.props.project + '/Functions/' + funct + '/SubForms/' + sub} key_db={'Funct_text'}
                                                text_id={funct + sub} subheader={(index + 1) + '.' + (index2 + 1) + ':'} type='Functions'
                                                sub={true} value={this.props.functions[funct].SubForms[sub].Funct_text}
                                                header='What functions enable the System to achieve its mission?'/>
                                }
                                {this.props.edit_mode ? '' : (index2+1) === Object.keys(this.props.functions[funct].SubForms).length ? <SwapDownButton/> :
                                                                                <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                path={'Projects/' + this.props.project + '/Functions/' + funct + '/SubForms'}
                                                                                                key_db={sub} key_db2={Object.keys(this.props.functions[funct].SubForms)[index2+1]}/>}
                                {this.props.edit_mode ? '' : index2 === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                            path={'Projects/' + this.props.project + '/Functions/' + funct + '/SubForms'}
                                                                                                            key_db={sub} key_db2={Object.keys(this.props.functions[funct].SubForms)[index2-1]}/>}
                                <span style={{ display: 'none' }}>{num_functs = num_functs + 1}</span>
                            </div>
                            )) : ''}
                        </Aux>
                    ))}
                </div>
            );
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}

export default Functions;