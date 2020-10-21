import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Popup from "reactjs-popup";
import TextForm from "../Components/TextForm";
import DropDownForm from "../Components/DropDownForm";
import HelpIcon from '@material-ui/icons/Help';

// This is a react component that creates specific add buttons that utilize TextForms and DropDownForms,
// which are also custom components.
// When clicked on, will open specific forms for the user to fill out and submit
// Anything that has to do with the mouse events is for the draggable modals.

class AddButton extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = { open: false, pos: {x: '35%', y: '35%'}, dragging: false, rel: null };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    openModal() {
        this.setState({ open: true })
    }

    closeModal() {
        this.setState({ open: false,
            pos: {
                x: '35%',
                y: '35%'
            }
        })
    }

    onMouseDown(e) {
        if (e.button !== 0) return
        var pos = e.target.getBoundingClientRect();
        console.log([e.pageX - pos.left, e.pageY - pos.top])
        this.setState({
            dragging: true,
            rel: {
                x: e.pageY - pos.top,
                y: e.pageX - pos.left
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseUp(e) {
        this.setState({dragging: false})
        e.stopPropagation()
        e.preventDefault()
    }

    onMouseMove(e) {
        if (!this.state.dragging) return
        this.setState({
            pos: {
                x: e.pageY - this.state.rel.x + 'px',
                y: e.pageX - this.state.rel.y + 'px'
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    componentDidUpdate(props, state, snapshot) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    render () {
        if(this.props.type === 'Losses' || this.props.type === 'Functions') {
            return (
                <div className='addButton'>
                    <AddCircleIcon onClick={this.openModal} fontSize={this.props.fontSize} className='no_print'/>
                    <Popup
                        open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                            <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                                {this.props.header}
                                <div className='tooltipright'>
                                    <HelpIcon fontSize="small"/>
                                    <span className='tooltiptextright'>
                                        Here you can add multiple entries by pressing tab in the textbox
                                    </span>
                                </div>
                            </p>
                        <TextForm user={this.props.user} type2={this.props.type} project={this.props.project} submitted={this.closeModal} prefix={this.props.prefix}  _length={this.props._length} path={this.props.path} type='addButton' placeholder={this.props.placeholder}/>
                    </Popup>
                </div>
            );
        }
        else if(this.props.type === 'Hazards' || this.props.type === 'Constraints') {
            return (
                <div className='addButton'>
                    <AddCircleIcon onClick={this.openModal} className='no_print'/>
                    <Popup open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                            {this.props.header}
                            <div className='tooltipright'>
                                <HelpIcon fontSize="small"/>
                                <span className='tooltiptextright'>
                                        Here you can add multiple entries by pressing tab in the textbox
                                    </span>
                            </div>
                        </p>
                        <DropDownForm user={this.props.user} project={this.props.project} submitted={this.closeModal} prefix={this.props.prefix} path={this.props.path} key_text={this.props.key_text} related_tags={this.props.related_tags} options={this.props.options} type='addButton' placeholder={this.props.placeholder}/>
                    </Popup>
                </div>
            );
        }
        else if(this.props.type === 'UCA') {
            return (
                <div className='addButton'>
                    <AddCircleIcon onClick={this.openModal} className='no_print'/>
                    <Popup
                        open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                            {this.props.header}
                            <div className='tooltipright'>
                                <HelpIcon fontSize="small"/>
                                <span className='tooltiptextright'>
                                        Here you can add multiple entries by pressing tab in the textbox
                                    </span>
                            </div>
                        </p>
                        <TextForm user={this.props.user} project={this.props.project} submitted={this.closeModal} prefix={this.props.prefix} path={this.props.path} path2={this.props.path2} type='addButton' type2='UCA' placeholder={this.props.placeholder}/>
                    </Popup>
                </div>
            );
        }
    }
}

export default AddButton;