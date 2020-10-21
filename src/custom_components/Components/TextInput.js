import React from 'react';

// This component creates a text input for use in TextForm. Will let TextForm keep track of
// mouse events and attach things like its ID or value.

class TextInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: this.props.value};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <div className={this.props.class}>
                <input id={this.props.text_id} type={"password" === this.props.type ? 'password' : 'text'} list={typeof this.props.list === 'undefined' ? '' : this.props.list} placeholder={this.props.placeholder}
                       value={this.state.value} className="input" onChange={this.handleChange} onKeyDown={(event) => typeof this.props.onKeyDown === 'undefined' ? null : this.props.onKeyDown(event, this.props.index)}/>
            </div>
        );
    }
}

export default TextInput;