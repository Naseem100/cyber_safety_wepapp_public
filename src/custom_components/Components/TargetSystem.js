import React from 'react';
import EditButton from "../Buttons/EditButton";
import UpdateData from "../FirebaseFunctions/UpdateData";
import AddButton from "../Buttons/AddButton";

// This is a react component used in Step 1 that will produce the interface for the target system part of the step.
// Utilizes several other components for the buttons and data management

class TargetSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: null
        }
        this.acceptMethods = this.acceptMethods.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event, system){
        if(event.key === 'Enter'){
            let key = system;
            let path = 'Projects/' + this.props.project + '/Target_System';
            let data = {};
            data[key] = document.getElementById('System').value;
            UpdateData(this.props.user, path, data);
        }
    }

    acceptMethods(openModal, value) {
        // Parent stores the method that the child passed
        this.Foo = {}
        this.Foo[value] = openModal;
    }

    render() {
        return (
            <div className='part1_info' >
                {this.props.edit_mode ?
                    <form className='goal_desc_form' onKeyDown={(e) => this.handleKeyDown(e, 'Target_System')}>
                        <textarea id='System' className='goal_desc_form_text'>{this.props.system}</textarea>
                    </form> :
                    <div className='part1_info_p' >
                        <div className='inline' onClick={() => this.Foo[this.props.system]()}>
                            {this.props.system}
                        </div>
                        <EditButton setClick={this.acceptMethods} user={this.props.user} project={this.props.project} path={'Projects/' + this.props.project + '/Target_System'} text_id='System' subheader='' type='System' value={this.props.system} header='What is the Target System?'/>
                    </div>
                }
            </div>
        );
    }
}

export default TargetSystem;