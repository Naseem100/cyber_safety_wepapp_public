import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import React from "react";
import DeleteData from "../FirebaseFunctions/DeleteData";
import UpdateData from "../FirebaseFunctions/UpdateData";
import Aux from "../../hoc/_Aux";
import SwapDownButton from "../Buttons/SwapDownButton";
import SwapUpButton from "../Buttons/SwapUpButton";
import RemoveIcon from "@material-ui/icons/Remove";

// This is a react component used in Step 1 that will produce the interface for the constraints part of the step.
// Utilizes several other components for the buttons and data management

class Constraints extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.Foo = {};

        this.acceptMethods = this.acceptMethods.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTag = this.handleTag.bind(this);
    }

    handleClick(cons, haz) {
        let path = 'Projects/' + this.props.project + '/Constraints/' + cons + '/Hazards';
        let key =  haz;
        DeleteData(this.props.user,path,key);
    }

    handleKeyDown(event, cons, path){
        if(event.key === 'Enter'){
            let key = cons;
            let data = {};
            data['Cons_text'] = document.getElementById(key).value;
            UpdateData(this.props.user, path, data);
        }
    }

    handleTag(haz, cons, sub, index) {
        try {
            let indexTag = Object.keys(this.props.hazards).indexOf(haz);
            let indexSubTag = Object.keys(this.props.hazards).indexOf(haz.split(':')[0]);
            if (indexTag > -1) {
                return (
                    <span className='related_loss_haz tooltipright'>
                        {sub? '' : <a className='related_loss_haz_button' href='javascript:void(0)' onClick={() => {this.handleClick(cons, haz)}}>X</a>}
                        {'H-' + (indexTag+1)}
                        <span className='tooltiptextright'>
                            {(this.props.hazards[haz].Haz_text)}
                        </span>
                    </span>
                )
            }else if(indexSubTag > -1) {
                return (
                    <span className='related_loss_haz tooltipright'>
                        {'H-' + (indexSubTag+1) + '.' + haz.split(':')[1]}
                        <span className='tooltiptextright tooltip_right_width'>
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

    acceptMethods(openModal, value) {
        // Parent stores the method that the child passed
        this.Foo[value] = openModal;
    }

    render() {
        let num_cons = 0;
        try {
            let keys = Object.keys(this.props.constraints);
            return (
                <div className='part2_info_parent'>
                    {keys.map((cons, index) => (
                        <Aux>
                            <div className='part2_info' style={ num_cons%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                                {this.props.edit_mode ?
                                    <div className='part2_info_p_edit_mode'>
                                        <span className='part2_text_tag_num'>{'SC-' + (index + 1)} : </span>
                                        <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, cons, 'Projects/' + this.props.project + '/Constraints/' + cons)}>
                                            <textarea id={cons}
                                                      className='goal_desc_form_text'>{this.props.constraints[cons].Cons_text}</textarea>
                                        </form>
                                        <div>
                                            {(typeof this.props.constraints[cons].Hazards === 'undefined') ? '' :
                                                (Object.keys(this.props.constraints[cons].Hazards)).map((haz, index3) => (
                                                    this.handleTag(haz, cons, false, index3)
                                                ))}
                                        </div>
                                    </div> :
                                    <div className='part2_info_p'>
                                        <div className='part2_info_p_2' onClick={() => this.Foo[this.props.constraints[cons].Cons_text]()}>
                                            <span className='part2_text_tag_num'>{'SC-' + (index + 1)}:{' '}</span>
                                            <span className='part2_info_p_text'>{this.props.constraints[cons].Cons_text}</span>
                                        </div>
                                        <div className='part2_info_p_tags'>
                                            {(typeof this.props.constraints[cons].Hazards === 'undefined') ? '' :
                                                (Object.keys(this.props.constraints[cons].Hazards)).map((haz, index3) => (
                                                    this.handleTag(haz, cons, false, index3)
                                            ))}
                                        </div>
                                    </div>
                                }
                                <DeleteButton user={this.props.user} project={this.props.project}
                                              path={'Projects/' + this.props.project + '/Constraints'} key_db={cons}
                                              type='Constraints' name={cons}/>
                                {this.props.edit_mode ? '' :
                                    <EditButton user={this.props.user} project={this.props.project}
                                                setClick = {this.acceptMethods}
                                                path={'Projects/' + this.props.project + '/Constraints'}
                                                subheader={'SC-' + (index + 1) + ': '} text_id={cons} key_db={cons}
                                                key_text='Cons_text' related_tags='Hazards' options={this.props.hazards}
                                                type='Constraints'
                                                value={this.props.constraints[cons].Cons_text} placeholder='Constraint:'
                                                header='What system-level constraints can be defined?'/>
                                }
                                {this.props.edit_mode ? '' : (index+1) === keys.length ? <SwapDownButton/> : <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                                             path={'Projects/' + this.props.project + '/Constraints'}
                                                                                                                             key_db={cons} key_db2={keys[index+1]}/>}
                                {this.props.edit_mode ? '' : index === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                           path={'Projects/' + this.props.project + '/Constraints'}
                                                                                                           key_db={cons} key_db2={keys[index-1]}/>}
                                <span style={{ display: 'none' }}>{num_cons = num_cons + 1}</span>
                            </div>
                            {(typeof this.props.constraints[cons].SubForms !== 'undefined') ? Object.keys(this.props.constraints[cons].SubForms).map((sub,index2) => (
                                <div className='part2_info' style={ num_cons%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                                    {this.props.edit_mode ?
                                        <div className='part2_info_p_edit_mode'>
                                            <span>{'SC-' + (index + 1) + '.' + (index2 + 1)} : </span>
                                            <form className='goal_desc_form'
                                                  onKeyDown={(e) => this.handleKeyDown(e, cons + sub, 'Projects/' + this.props.project + '/Constraints/' + cons + '/SubForms/' + sub)}>
                                            <textarea id={cons + sub}
                                                      className='goal_desc_form_text'>{this.props.constraints[cons].SubForms[sub].Cons_text}</textarea>
                                            </form>
                                            <div>
                                                {(typeof this.props.constraints[cons].SubForms[sub].Hazards === 'undefined') ? '' :
                                                    (Object.keys(this.props.constraints[cons].SubForms[sub].Hazards)).map((haz, index3) => (
                                                        this.handleTag(haz, cons, true, index3)
                                                    ))}
                                            </div>
                                        </div> :
                                        <div className='part2_info_p'>
                                            <div className='part2_info_p_2_sub'
                                                 onClick={() => this.Foo[this.props.constraints[cons].SubForms[sub].Cons_text]()}>
                                                <RemoveIcon style={ { color: 'rgb(185 185 185)'} }/>
                                                <span className='part2_text_tag_num'>{'SC-' + (index + 1) + '.' + (index2 + 1)}:{' '}</span>
                                                <span className='part2_info_p_text'>{this.props.constraints[cons].SubForms[sub].Cons_text}</span>
                                            </div>
                                            <div className='part2_info_p_tags'>
                                                {(typeof this.props.constraints[cons].SubForms[sub].Hazards === 'undefined') ? '' :
                                                    (Object.keys(this.props.constraints[cons].SubForms[sub].Hazards)).map((haz, index3) => (
                                                        this.handleTag(haz, cons, true, index3)
                                                    ))}
                                            </div>

                                        </div>
                                    }
                                    <DeleteButton user={this.props.user} project={this.props.project}
                                                  path={'Projects/' + this.props.project + '/Constraints/' + cons + '/SubForms'} key_db={sub}
                                                  type='Constraints' name={index2 + 1}/>
                                    {this.props.edit_mode ? '' :
                                        <EditButton user={this.props.user} project={this.props.project}
                                                    setClick = {this.acceptMethods}
                                                    path={'Projects/' + this.props.project + '/Constraints/' + cons + '/SubForms'}
                                                    subheader={'SC-' + (index + 1) + '.' + (index2 + 1) + ':'} text_id={sub} key_db={sub}
                                                    key_text='Cons_text' related_tags='Hazards' options={this.props.hazards}
                                                    type='Constraints' sub={true}
                                                    value={this.props.constraints[cons].SubForms[sub].Cons_text} placeholder='Constraint:'
                                                    header='What system-level constraints can be defined?'/>
                                    }
                                    {this.props.edit_mode ? '' : (index2+1) === Object.keys(this.props.constraints[cons].SubForms).length ? <SwapDownButton/> :
                                                                                                <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                                path={'Projects/' + this.props.project + '/Constraints/' + cons + '/SubForms'}
                                                                                                                key_db={sub} key_db2={Object.keys(this.props.constraints[cons].SubForms)[index2+1]}/>}
                                    {this.props.edit_mode ? '' : index2 === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                                path={'Projects/' + this.props.project + '/Constraints/' + cons + '/SubForms'}
                                                                                                                key_db={sub} key_db2={Object.keys(this.props.constraints[cons].SubForms)[index2-1]}/>}
                                    <span style={{ display: 'none' }}>{num_cons = num_cons + 1}</span>
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

export default Constraints;