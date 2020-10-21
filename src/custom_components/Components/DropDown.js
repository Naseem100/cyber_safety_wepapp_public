import React from "react";
import Aux from "../../hoc/_Aux";

// This is a react component that creates a dropdown for use in other components.
// Not general, will only work for Hazards and Losses since they are the only
// components that are needed as dropdowns

class DropDown extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }

    render() {
        if(this.props.options === null) {
            return (
                <select id={this.props.dropID} className='select' multiple required size={0}>
                </select>);
        }
        else if(this.props.path === 'Constraint:' || this.props.path === 'UCA Description:') {
            return (
                <select id={this.props.dropID} className='select' multiple size={this.props.options.length}>
                    {Object.keys(this.props.options).map((elem, index) => (
                        <Aux>
                            <option value={elem} title={this.props.options[elem].Haz_text}>
                                {'H-' + (index + 1)}
                            </option>
                            {typeof this.props.options[elem].SubForms === 'undefined' ? '' :
                                Object.keys(this.props.options[elem].SubForms).map((elem2, index2) => (
                                    <option value={elem + ':' + elem2} title={this.props.options[elem].SubForms[elem2].Haz_text}>
                                        {'H-' + (index + 1) + '.' + (index2 + 1)}
                                    </option>
                            ))}
                        </Aux>
                    ))}
                </select>
            );
        }
        else {
            return (
                <select id={this.props.dropID} className='select' multiple size={this.props.options.length}>
                    {Object.keys(this.props.options).map((elem, index) => (
                        <option value={elem} title={this.props.options[elem]}>
                            {'L-' + (index + 1)}
                        </option>
                    ))}
                </select>
            );
        }
    }
}

export default DropDown;