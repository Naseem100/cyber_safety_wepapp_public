import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import CopyData from "../FirebaseFunctions/CopyData";

// This is a react component that creates a copy button for projects to be duplicated.

class CopyButton extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        let path = this.props.path;
        let key = this.props.key_db;

        CopyData(this.props.user, this.props.user2, path, key)
    }

    render () {
        return (
            <div className='deleteButton'>
                <IconButton tabindex="-1" onClick={this.handleClick}>
                    <FileCopyIcon  className={this.props.class} fontSize={this.props.fontSize} style={{ color: "white" }}/>
                </IconButton>
            </div>
        );
    }
}

export default CopyButton;