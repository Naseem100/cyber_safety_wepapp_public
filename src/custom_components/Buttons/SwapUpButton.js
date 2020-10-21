import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import SwapItemOrder from "../FirebaseFunctions/SwapItemOrder";

// This is a react component that creates a swap up button, which will allow different elements of say Hazards
// to swap positions with whatever is above them.

class SwapUpButton extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        let path = this.props.path;
        let key = this.props.key_db;
        let key2 = this.props.key_db2;

        SwapItemOrder(this.props.user, path, key, key2)
    }

    render () {
        return (
            <div className='deleteButton no_print'>
                <IconButton tabindex="-1" onClick={this.handleClick}>
                    <ExpandLess  className={this.props.class} fontSize={this.props.fontSize} style={{ color: "black" }}/>
                </IconButton>
            </div>
        );
    }
}

export default SwapUpButton;