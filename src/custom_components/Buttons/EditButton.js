import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Popup from "reactjs-popup";
import TextForm from "../Components/TextForm";
import DropDownForm from "../Components/DropDownForm";

// This is a react component that creates an edit button that will open specific popups for certain components
// to edit data
// Anything that has to do with the mouse events is for the draggable modals.

class EditButton extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = { open: false, pos: {x: '35%', y: '35%'}, dragging: false, rel: null};

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
        if(this.props.setClick != null)
            this.props.setClick(this.openModal, this.props.value);

        if(this.props.type === 'System') {
            return (
                <div className='editButton no_print'>
                    <EditIcon onClick={this.openModal} fontSize={this.props.fontSize}/>
                    <Popup
                        open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                            {this.props.header}
                        </p>
                        <TextForm user={this.props.user} submitted={this.closeModal} key_db='Target_System' text_id={this.props.text_id} path={this.props.path} type='editButton' subheader={this.props.subheader} value={this.props.value}/>
                    </Popup>
                </div>
            );
        }
        else if(this.props.type === 'Losses' || this.props.type === 'Functions') {
            return (
                <div className='editButton no_print'>
                    <EditIcon onClick={this.openModal} fontSize={this.props.fontSize} className={this.props.class}/>
                    <Popup
                        open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                            {this.props.header}
                        </p>
                        <TextForm user={this.props.user} submitted={this.closeModal} key_db={this.props.key_db} text_id={this.props.text_id} path={this.props.path} type='editButton' type2={this.props.type} sub={this.props.sub} subheader={this.props.subheader} value={this.props.value}/>
                    </Popup>
                </div>
            );
        }
        else if(this.props.type === 'Hazards' || this.props.type === 'Constraints') {
            return (
                <div className='editButton no_print'>
                    <EditIcon onClick={this.openModal}/>
                    <Popup
                        open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                            {this.props.header}
                        </p>
                        <DropDownForm user={this.props.user} submitted={this.closeModal} key_text={this.props.key_text} key_db={this.props.key_db} text_id={this.props.text_id} type='editButton' type2={this.props.type} sub={this.props.sub} placeholder={this.props.placeholder} related_tags={this.props.related_tags} path={this.props.path} subheader={this.props.subheader} value={this.props.value} options={this.props.options}/>
                    </Popup>
                </div>
            );
        }
        if(this.props.type === 'Projects') {
            return (
                <div className='editButton no_print'>
                    <EditIcon onClick={this.openModal} fontSize={this.props.fontSize}/>
                    <Popup
                        open={this.state.open} onClose={this.closeModal} modal closeOnDocumentClick contentStyle={{ position: 'absolute', top: this.state.pos.x, left: this.state.pos.y }}>
                        <p className='modal_header' onMouseDown={(event) => this.onMouseDown(event)}>
                            {this.props.header}
                        </p>
                        <TextForm user={this.props.user} submitted={this.closeModal} key_db={this.props.key_db} text_id={this.props.text_id} path={this.props.path} section={this.props.type} type='editButton' subheader={this.props.subheader} value={this.props.value}/>
                    </Popup>
                </div>
            );
        }
    }
}

export default EditButton;