import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import React from "react";
import DeleteData from '../FirebaseFunctions/DeleteData';
import UpdateData from "../FirebaseFunctions/UpdateData";
import HelpIcon from "@material-ui/icons/Help";
import Aux from "../../hoc/_Aux";
import SwapDownButton from "../Buttons/SwapDownButton";
import SwapUpButton from "../Buttons/SwapUpButton";
import RemoveIcon from "@material-ui/icons/Remove";

// This is a react component used in Step 1 that will produce the interface for the hazards part of the step.
// Utilizes several other components for the buttons and data management

class Hazards extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.Foo = {};

        this.acceptMethods = this.acceptMethods.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTag = this.handleTag.bind(this);
    }

    handleClick(haz, loss) {
        let path = 'Projects/' + this.props.project+ '/Hazards/' + haz + '/Losses';
        let key =  loss;
        DeleteData(this.props.user, path,key);
    }

    handleKeyDown(event, haz, path){
        if(event.key === 'Enter'){
            let key = haz;
            let data = {};
            data['Haz_text'] = document.getElementById(key).value;
            UpdateData(this.props.user, path, data);
        }
    }

    handleTag(loss,haz, haz_losses, sub, index) {
        try {
            if (loss in haz_losses) {
                return (
                    <span className='related_loss_haz tooltipright'>
                        {sub ? '' : <a className='related_loss_haz_button' href='javascript:void(0)'
                                       onClick={() => {this.handleClick(haz, loss)}}>X</a>}
                        {'L-' + (index+1)}
                        <span className='tooltiptextright tooltip_right_width'>
                            {(this.props.losses[loss])}
                        </span>
                </span>)
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    acceptMethods(openModal, value) {
        // Parent stores the method that the child passed
        this.Foo[value] = openModal;
    }

    render() {
        let num_haz = 0;
        try {
            let keys = Object.keys(this.props.hazards);
            return (
                <div className='part2_info_parent'>
                    {keys.map((haz, index) => (
                        <Aux>
                        <div className='part2_info' style={ num_haz%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                            {this.props.edit_mode ?
                                <div className='part2_info_p_edit_mode'>
                                    <span>{'H-' + (index + 1)} : </span>
                                    <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, haz, 'Projects/' + this.props.project + '/Hazards/' + haz)}>
                                        <textarea id={haz}
                                                  className='goal_desc_form_text'>{this.props.hazards[haz].Haz_text}</textarea>
                                    </form>
                                    <div>
                                        {Object.keys(this.props.losses).map((loss, index2) => (
                                            this.handleTag(loss, haz, this.props.hazards[haz].Losses, false, index2)
                                        ))}
                                    </div>
                                </div> :
                                    <div className='part2_info_p'>
                                        <div className='part2_info_p_2' onClick={() => this.Foo[this.props.hazards[haz].Haz_text]()}>
                                            <span className='part2_text_tag_num'>{'H-' + (index + 1)}: </span>
                                            <span className='part2_info_p_text'>{this.props.hazards[haz].Haz_text}</span>
                                        </div>
                                        <div className='part2_info_p_tags'>
                                            {Object.keys(this.props.losses).map((loss, index2) => (
                                                this.handleTag(loss, haz, this.props.hazards[haz].Losses, false, index2)
                                            ))}
                                        </div>
                                    </div>
                            }
                            <DeleteButton user={this.props.user} project={this.props.project} path={'/Hazards/'}
                                          constraints={this.props.constraints} key_db={haz} haz_tag={haz} type='Hazards'
                                          name={haz}/>
                            {this.props.edit_mode ? '' :
                                <EditButton user={this.props.user} project={this.props.project}
                                            setClick = {this.acceptMethods}
                                            path={'Projects/' + this.props.project + '/Hazards'}
                                            subheader={'H-' + (index + 1) + ': '} text_id={haz} key_db={haz}
                                            key_text='Haz_text' related_tags='Losses' options={this.props.losses}
                                            type='Hazards'
                                            value={this.props.hazards[haz].Haz_text} placeholder='Hazard:'
                                            header='What hazards can lead to system-level losses?'/>
                            }
                            {this.props.edit_mode ? '' : (index+1) === keys.length ? <SwapDownButton/> : <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                                         path={'Projects/' + this.props.project + '/Hazards'}
                                                                                                                         key_db={haz} key_db2={keys[index+1]}/>}
                            {this.props.edit_mode ? '' : index === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                       path={'Projects/' + this.props.project + '/Hazards'}
                                                                                                       key_db={haz} key_db2={keys[index-1]}/>}
                            <span style={{ display: 'none' }}>{num_haz = num_haz + 1}</span>
                        </div>
                        {(typeof this.props.hazards[haz].SubForms !== 'undefined') ? Object.keys(this.props.hazards[haz].SubForms).map((sub,index2) => (
                            <div className='part2_info' style={ num_haz%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                                {this.props.edit_mode ?
                                    <div className='part2_info_p_edit_mode'>
                                        <span>{'H-' + (index + 1) + '.' + (index2 + 1)}:</span>
                                        <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, haz + sub, 'Projects/' + this.props.project + '/Hazards/' + haz + '/SubForms/' + sub)}>
                                            <textarea id={haz + sub}
                                                      className='goal_desc_form_text'>{this.props.hazards[haz].SubForms[sub].Haz_text}</textarea>
                                        </form>
                                        <div>
                                            {Object.keys(this.props.losses).map((loss, index3) => (
                                                this.handleTag(loss, haz, this.props.hazards[haz].SubForms[sub].Losses, true, index3)
                                            ))}
                                        </div>
                                    </div> :
                                    <div className='part2_info_p'>
                                        <div className='part2_info_p_2_sub'
                                             onClick={() => this.Foo[this.props.hazards[haz].SubForms[sub].Haz_text]()}>
                                            <RemoveIcon style={ { color: 'rgb(185 185 185)'} }/>
                                            <span className='part2_text_tag_num'>{'H-' + (index + 1) + '.' + (index2 + 1)}{': '}</span>
                                            <span className='part2_info_p_text'>{this.props.hazards[haz].SubForms[sub].Haz_text}</span>
                                        </div>
                                        <div className='part2_info_p_tags'>
                                            {Object.keys(this.props.losses).map((loss, index3) => (
                                                this.handleTag(loss, haz, this.props.hazards[haz].SubForms[sub].Losses, true, index3)
                                            ))}
                                        </div>
                                    </div>
                                }
                                <DeleteButton user={this.props.user} project={this.props.project} path={'/Hazards/'}
                                              constraints={this.props.constraints} key_db={haz + '/SubForms/' + sub} haz_tag={haz} type='Hazards'
                                              name={sub}/>
                                {this.props.edit_mode ? '' :
                                    <EditButton user={this.props.user} project={this.props.project}
                                                setClick = {this.acceptMethods}
                                                path={'Projects/' + this.props.project + '/Hazards/' + haz + '/SubForms'}
                                                subheader={'H-' + (index + 1) + '.' + (index2 + 1) + ': '} text_id={sub} key_db={sub}
                                                key_text='Haz_text' related_tags='Losses' options={this.props.losses}
                                                type='Hazards' sub={true}
                                                value={this.props.hazards[haz].SubForms[sub].Haz_text} placeholder='Hazard:'
                                                header='What hazards can lead to system-level losses?'/>
                                }
                                {this.props.edit_mode ? '' : (index2+1) === Object.keys(this.props.hazards[haz].SubForms).length ? <SwapDownButton/> :
                                                                                            <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                            path={'Projects/' + this.props.project + '/Hazards/' + haz + '/SubForms'}
                                                                                                            key_db={sub} key_db2={Object.keys(this.props.hazards[haz].SubForms)[index2+1]}/>}
                                {this.props.edit_mode ? '' : index2 === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                            path={'Projects/' + this.props.project + '/Hazards/' + haz + '/SubForms'}
                                                                                                            key_db={sub} key_db2={Object.keys(this.props.hazards[haz].SubForms)[index2-1]}/>}
                                <span style={{ display: 'none' }}>{num_haz = num_haz + 1}</span>
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

export default Hazards;