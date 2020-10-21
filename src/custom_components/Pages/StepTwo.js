import React, {Component} from 'react';
import AddFile from "../FirebaseFunctions/AddFile";
import {Row, Col, Card} from 'react-bootstrap';
import {Prompt} from 'react-router-dom'
import Aux from "../../hoc/_Aux";
import DiagramEditor from '../FirebaseFunctions/WindowFrame';

// This is the second step in the STAMP analysis.
// This page will essentially contain a frame for draw.io, an image that holds the current diagram as an svg,
// and a button that will open up draw.io when you want to edit something.

class StepTwo extends React.Component{
    constructor(props) {
        super(props);
        this.state = { frame: false, url: '&demo=1', url2: '', diagram: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxcHgiIGhlaWdodD0iMXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMSAxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7VTNCbGQ5WVBOVU9WVjMyWU1oUlMmcXVvdDsgYWdlbnQ9JnF1b3Q7NS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS84NC4wLjQxNDcuMTA1IFNhZmFyaS81MzcuMzYmcXVvdDsgbW9kaWZpZWQ9JnF1b3Q7MjAyMC0wNy0zMFQxNzoyMjozMS44NDNaJnF1b3Q7IGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IHZlcnNpb249JnF1b3Q7MTMuNS43JnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O3JVdXh2bWFtZE5aMXpyTFhPbF82JnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2xkRlBENElnRkFEd1Q4T3hEYUUyT3phMXV0UmFIdHE4TVNGa1E1OURtdGFuendabXJFdHRIQjQvSHUveEI5R2tIbmFHdGRVQnVOQ0lZRDRnbWlKQzFvU2cxOEQ4N29IR0RxUlIzRkUwUTY0ZXdpUDJlbE5jZEVHaUJkQld0U0dXMERTaXRJRXhZNkFQMDY2Z3c2NHRrK0lMOHBMcGI3MG9iaXVuOFFyUHZoZEtWbFBuQ1B1Vm1rM0pIcnFLY2VnL2lHYUlKZ2JBdXFnZUVxRmZiemU5eXpFNnBVdEN6NHVtd0tVa202eVFhdUdLYmYvWjhyNkNFWTM5dGZRWXpFY2JKOEgvMHV3SiZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiPjxkZWZzLz48Zy8+PC9zdmc+'}

        this.handleClick = this.handleClick.bind(this);
        this.setFrame = this.setFrame.bind(this);
        this.stopClose = this.stopClose.bind(this);
        this.alertExit = this.alertExit.bind(this);

    }

    // Only used if upload button is in use
    handleClickExtra(event) {
        let user = this.props.user;
        AddFile(user, this.props.project);
        event.preventDefault();
    }

    componentDidMount() {
        // Need this to use the firebase functions
        var firebase = require('firebase');
        const database = firebase.database();

        // Not used right now since the diagram is instead stored as compressed xml in the database
        //const file = firebase.storage().ref('Users/' + this.props.user + '/' + this.props.project + '/').child('diagram.xml');
        //file.getDownloadURL().then((url) => {
        //    this.setState({ url: ("&url=" + encodeURIComponent(url)) }
        //    )}, (error) => {
        //    console.log(error)
        //});

        // Will retrieve latest STAMP custom library from Firebase Storage
        const file2 = firebase.storage().ref('Cybersafety').child('Cybersafety.xml');
        file2.getDownloadURL().then((url) => {
            this.setState({ url2: encodeURIComponent(url) }
            )}, (error) => {
            console.log(error)
        });

        // Retrieves the compressed diagram from the database
        database.ref(this.props.user + '/Projects/' + this.props.project + '/StepTwo').on('value', (snapshot) => {
            this.setState({
                diagram: (snapshot.val() != null) ? snapshot.val() : this.state.diagram
            })
        });


        const divEl = document.querySelector('.pcoded-inner-navbar');
        divEl.addEventListener('mousedown', this.alertExit);

    }

    componentWillUnmount() {
        const divEl = document.querySelector('.pcoded-inner-navbar');
        divEl.removeEventListener('mousedown', this.alertExit);
        window.removeEventListener('beforeunload', this.stopClose)
    }

    alertExit() {
        if(this.state.frame)
            alert('Make sure to save and exit the diagram')
    }

    setFrame() {
        this.setState({ frame: false })
    }

    stopClose(e) {
        e.returnValue = "show message"
    }

    // Will create a frame for draw.io and utilize DiagramEditor from FirebaseFunctions to decompress the xml
    handleClick() {
        this.setState({ frame: true })
        window.addEventListener('beforeunload', this.stopClose)
        DiagramEditor.editElement(document.querySelector('#image'), this.state.url2, this.props.user, this.props.project, this.setFrame);
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card className='first_page_row'>
                            <div className='interface_S2_parent'>
                                <Prompt
                                when = {!!this.state.frame}
                                message = {location => 'Are you sure you don\'t want to save the diagram?'} />
                                <div id='iframe' className='interface_S2'>
                                    <button className='diagram_edit no_print' onClick={this.handleClick}> Edit Diagram </button>
                                    <img id='image' src={this.state.diagram}>
                                    </img>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default StepTwo;