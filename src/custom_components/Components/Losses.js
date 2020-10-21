import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import React from "react";
import UpdateData from "../FirebaseFunctions/UpdateData";
import SwapUpButton from "../Buttons/SwapUpButton";
import SwapDownButton from "../Buttons/SwapDownButton";

// This is a react component used in Step 1 that will produce the interface for the losses part of the step.
// Utilizes several other components for the buttons and data management

class Losses extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.Foo = {};

        this.acceptMethods = this.acceptMethods.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event, loss){
        if(event.key === 'Enter'){
            let key = loss;
            let path = 'Projects/' + this.props.project + '/Losses';
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
        try {
            let keys = Object.keys(this.props.losses);
            return (
                <div className='part2_info_parent'>
                    {keys.map((loss, index) => (
                        <div className='part2_info' style={ index%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                            {this.props.edit_mode ?
                                <div className='part2_info_p_edit_mode'>
                                    <span className='part2_info_p_tag part2_text_tag_number'>{'L-' + (index + 1)}: </span>
                                    <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, loss)}>
                                        <textarea id={loss} className='goal_desc_form_text'>
                                            {this.props.losses[loss]}
                                        </textarea>
                                    </form>
                                </div> :
                                <div className='part2_info_p' onClick={() => this.Foo[this.props.losses[loss]]()}>
                                    <div className='part2_info_p_2'>
                                        <span className='part2_text_tag_num'>{'L-' + (index + 1)}: </span>
                                        {this.props.losses[loss]}
                                    </div>
                                </div>
                            }
                            <DeleteButton user={this.props.user} project={this.props.project} path={'/Losses/'}
                                          key_db={loss} loss_tag={loss} type='Losses' name={loss}/>
                            {this.props.edit_mode ? '' :
                                <EditButton user={this.props.user} project={this.props.project}
                                            setClick={this.acceptMethods}
                                            path={'Projects/' + this.props.project + '/Losses'} key_db={loss}
                                            text_id={loss} subheader={'L-' + (index + 1) + ':'} type='Losses'
                                            value={this.props.losses[loss]}
                                            header='What is the worst that can happen to the System?'/>
                            }
                            {this.props.edit_mode ? '' : (index+1) === keys.length ? <SwapDownButton/> : <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                                                         path={'Projects/' + this.props.project + '/Losses'}
                                                                                                                         key_db={loss} key_db2={keys[index+1]}/>}
                            {this.props.edit_mode ? '' : index === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                                                       path={'Projects/' + this.props.project + '/Losses'}
                                                                                                       key_db={loss} key_db2={keys[index-1]}/>}
                        </div>
                    ))}
                </div>
            );
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}

export default Losses;