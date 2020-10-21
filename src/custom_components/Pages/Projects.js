import React from 'react';
import AddButton from "../Buttons/AddButton";
import ProjectComponent from '../Components/ProjectComponent';
import * as firebase from 'firebase';
import 'firebase/database'
import '../../assets/App.css'
import manual from "../../assets/CyberSafetyManual_SK2.pdf"
import Popup from "reactjs-popup";
import TextForm from "../Components/TextForm";
import HelpIcon from "@material-ui/icons/Help";
import CopyButton from "../Buttons/CopyButton";

// This is the first page of the Web tool, the projects page.
// It utilizes ProjectComponent to add the project boxes on the screen, and is otherwise quite simple.

class Projects extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            projects: ''
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ open: true })
    }

    closeModal() {
        this.setState({ open: false })
    }

    componentDidMount() {
        // Necessary to use Firebase functions
        var database = firebase.database();

        // Retrieves the Projects list
        database.ref(this.props.user.email.split('.').join('') + '/Projects').on('value', (snapshot) => {
            this.setState({
                projects: (snapshot.val() != null) ? snapshot.val() : this.state.projects
            })
        });
    }

    render() {
        return (
            <div className='landing_page'>
                <div className='interface_landing'>
                    <div className='projects_header_1'>
                        <h2>Hello {this.props.user.displayName},</h2>
                        <div>
                            <button onClick={this.openModal}>Create A Project</button>
                            <div className='tooltipright'>
                                <a href={manual} download={"CyberSecurityManual.pdf"}>
                                    <HelpIcon fontSize="small" style={{ color: "#ffffff" }}/>
                                </a>
                                <span className='tooltiptextright'>
                                    Click here to download the cybersecurity web tool manual
                                </span>
                            </div>
                        </div>
                        <div className='addButton'>
                            <Popup
                                open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick>
                                <p className='modal_header'> What's the name of your project? </p>
                                <TextForm user={this.props.user.email.split('.').join('')} project={this.props.project} submitted={this.closeModal} path={'Projects/'} type='addButton_Projects' placeholder='Project:'/>
                            </Popup>
                        </div>
                    </div>
                    <div className='projects_header_2'>
                        <h2>Your Projects</h2>
                        <div className='tooltipright'>
                            <CopyButton key_db={"Electric Generator"} user="ExampleProject" user2={this.props.user.email.split('.').join('')} path={'Projects'} fontSize='small'/>
                            <span className='tooltiptextright'>
                                This is where your projects are stored. If you want to see an example project, click on me!
                            </span>
                        </div>
                    </div>
                    <div className='projects_boxes'>
                        {this.state.projects === '' ?
                            '' :
                            Object.keys(this.state.projects).map((project) => (
                                <ProjectComponent name={this.state.projects[project].Project_Name.Project_Name} user={this.props.user.email.split('.').join('')} project={project} email={this.props.user.email.split('.').join('')}/>
                            ))}
                    </div>
                    <span className={'acknowledgement'}>
                            This project could not have been finished without the help of Stuart Madnick, Shaharyar
                            Khan, and Naseem Hamed. This material is based, in part, upon research supported by the
                            Department of Energy under Award Number DE-OE0000780, a seed grant from the MIT Energy
                            Initiative (MITei), and funds from the corporate members of Cybersecurity at MIT Sloan:
                            the Interdisciplinary Consortium for Improving Critical Infrastructure Cybersecurity. More
                            information about the project can be found at the following location:
                            https://cred-c.org/researchactivity/preventotphysdamage-anticipating-and-preventing-catastrophic-ot-physical-damage
                        </span>
                </div>
            </div>
        );
    }
}

export default Projects;