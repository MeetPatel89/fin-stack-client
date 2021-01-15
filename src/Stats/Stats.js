import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state= {

        }
    }

    render() {
        return (
            <>
                <p>Hello Stats</p>
               
                <button type="button" onClick={this.props.handleClick}>Back</button>
            </>
        )
    }
}