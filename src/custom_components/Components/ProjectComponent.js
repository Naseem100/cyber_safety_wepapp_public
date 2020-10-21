import React from 'react';
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import {Link} from "react-router-dom";
import CopyButton from "../Buttons/CopyButton";
import ShareProjectButton from "../Buttons/ShareProjectButton";
import HelpIcon from "@material-ui/icons/Help";
import {Card} from "react-bootstrap";

// This component will create the project box seen on the project page.
// Utilizes several other components for the buttons

class ProjectComponent extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='projects_name'>
                <Link exact to={`/${this.props.project}`}>{this.props.name}</Link>
                <div className='projects_icons'>
                    <div className='tooltipup'>
                        <EditButton key_db={this.props.project} text_id={this.props.project} user={this.props.email} type={'Projects'} path={'Projects/' + this.props.project + '/Project_Name'} value={this.props.name} header='Edit your project' fontSize='large'/>
                        <span className='tooltiptextup'>
                            Edit Project
                        </span>
                    </div>
                    <div className='tooltipup'>
                        <CopyButton key_db={this.props.project} user={this.props.user} user2={this.props.email} path={'Projects'} fontSize='large'/>
                        <span className='tooltiptextup'>
                            Copy Project
                        </span>
                    </div>
                    <div className='tooltipup'>
                        <ShareProjectButton key_db={this.props.project} text_id={this.props.project} user={this.props.email} path={'Projects'} header='Share to these User emails' fontSize='large'/>
                        <span className='tooltiptextup'>
                            Share Project
                        </span>
                    </div>
                    <div className='tooltipup'>
                        <DeleteButton key_db={this.props.project} type='Projects' user={this.props.email} path={'Projects'} fontSize='large'/>
                        <span className='tooltiptextup'>
                            Delete Project
                        </span>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProjectComponent;