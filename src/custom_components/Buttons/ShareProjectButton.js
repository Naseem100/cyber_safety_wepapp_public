import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import ShareProjectData from "../FirebaseFunctions/ShareProjectData";
import TextForm from "../Components/TextForm";
import Popup from "reactjs-popup";
import Aux from "../../hoc/_Aux";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import TextInput from "../Components/TextInput";

// This is a react component that creates a share button for use in the projects page.
// Will open a popup to enter another user's email for sharing projects.

class ShareProjectButton extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = { open: false, form_list: ['form1']};

        this.handleClick = this.handleClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        let path = this.props.path;
        let key = this.props.key_db;

        let emails = document.getElementById('shared_users').value;
        let email_list = emails.replace(/[ .]/g, '').split(',');

        for(let x =0; x < email_list.length; x++){
            console.log(email_list[x])
            ShareProjectData(this.props.user, email_list[x], path, key)
        }

        this.closeModal();
    }

    openModal() {
        this.setState({ open: true })
    }

    closeModal() {
        this.setState({ open: false })
    }

    render () {
        return (
            <div className='deleteButton'>
                <IconButton tabindex="-1" onClick={this.openModal}>
                    <ShareIcon className={this.props.class} fontSize={this.props.fontSize} style={{ color: "black" }}/>
                </IconButton>
                <Popup
                    open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick>
                    <p className='modal_header'>{this.props.header}</p>
                    <form className="form" onSubmit={(event) => this.handleClick(event)} autoComplete="off">
                        <div className='dropdown_container'>
                            <TextInput class='dropdown_text' text_id={'shared_users'} placeholder='Ex. Joe21@gmail.com, Bob324@gmail.com...'/>
                        </div>
                        <input type="submit" className="Submit"/>
                    </form>
                </Popup>
            </div>
        );
    }
}

export default ShareProjectButton;