import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import React from "react";
import UpdateData from "../FirebaseFunctions/UpdateData";
import SwapDownButton from "../Buttons/SwapDownButton";
import SwapUpButton from "../Buttons/SwapUpButton";

// This is a react component used in Step 1 that will produce the interface for the interdependencies part of the step.
// Utilizes several other components for the buttons and data management

class Interdependency extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.Foo = {};

        this.acceptMethods = this.acceptMethods.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event, inter){
        if(event.key === 'Enter'){
            let key = inter;
            let path = this.props.short_path;
            let data = {};
            data[key] = document.getElementById(key).value;
            UpdateData(path, data);
        }
    }

    acceptMethods(openModal, value) {
        // Parent stores the method that the child passed
        this.Foo[value] = openModal;
    }

    render() {
        try {
            let keys = Object.keys(this.props.interData);
            return (
                <div className='part2_info_parent'>
                    {keys.map((inter, index) => (
                        <div className='part2_info' style={ index%2 === 0 ? { background: 'rgb(243 243 243)', borderRadius: '15px'} : {}}>
                            {this.props.edit_mode ?
                                <div className='part2_info_p_edit_mode'><span>{(index + 1)} : </span>
                                    <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, inter)}>
                                        <textarea id={inter}
                                                  className='goal_desc_form_text'>{this.props.interData[inter]}</textarea>
                                    </form>
                                </div> :
                                <div className='part2_info_p part2_info_p_width' onClick={() => this.Foo[this.props.interData[inter]]()}>
                                    <div className='part2_info_p_2_functions'>
                                        <span className='part2_text_tag_num'>{(index + 1)}. </span>
                                        {this.props.interData[inter]}
                                    </div>
                                </div>
                            }
                            <DeleteButton user={this.props.user} project={this.props.project}
                                          path={'Projects/' + this.props.project + this.props.short_path} key_db={inter}
                                          type='Functions' name={inter}/>
                            {this.props.edit_mode ? '' :
                                <EditButton user={this.props.user} project={this.props.project}
                                            setClick={this.acceptMethods}
                                            path={'Projects/' + this.props.project + this.props.short_path} key_db={inter}
                                            text_id={inter} subheader={(index + 1) + ':'} type='Functions'
                                            value={this.props.interData[inter]}
                                            header={this.props.header}/>
                            }
                            {this.props.edit_mode ? '' : (index+1) === keys.length ? <SwapDownButton/> : <SwapDownButton user={this.props.user} project={this.props.project}
                                                                                              path={'Projects/' + this.props.project + this.props.short_path}
                                                                                              key_db={inter} key_db2={keys[index+1]}/>}
                            {this.props.edit_mode ? '' : index === 0 ? <SwapUpButton/> : <SwapUpButton user={this.props.user} project={this.props.project}
                                                                            path={'Projects/' + this.props.project + this.props.short_path}
                                                                            key_db={inter} key_db2={keys[index-1]}/>}
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

export default Interdependency;