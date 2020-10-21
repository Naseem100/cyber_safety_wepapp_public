import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DeleteData from "../FirebaseFunctions/DeleteData";
import DeleteDataMultiple from "../FirebaseFunctions/DeleteDataMultiple";

// This is a react component that creates a delete button for use in other components.
// Anything that has to do with the mouse events is for the draggable modals.

class DeleteButton extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        let path = this.props.path;
        let key = this.props.key_db;

        if(path === 'Projects') {
            var confirmation1 = window.confirm('Are you sure you want to delete this Project?');
            if(!confirmation1)
                return null
        }else if(path === 'Projects/' + this.props.project + '/UCA') {
            var confirmation2 = window.confirm('Are you sure you want to delete this Controller?');
            if(!confirmation2)
                return null
        }

        if(path === '/Losses/') {
            let path2 = '/Hazards/';
            DeleteDataMultiple(this.props.user, this.props.project, path, path2, key, this.props.loss_tag);
        }else if(path === '/Hazards/') {
            let path2 =  '/Constraints/';
            DeleteDataMultiple(this.props.user, this.props.project, path, path2, key, this.props.haz_tag);
        }else {
            DeleteData(this.props.user, path, key);
        }
    }

    render () {
        return (
            <div className='deleteButton no_print'>
                <IconButton tabindex="-1" onClick={this.handleClick}>
                    <DeleteIcon  className={this.props.class} fontSize={this.props.fontSize}/>
                </IconButton>
            </div>
        );
    }
}

export default DeleteButton;