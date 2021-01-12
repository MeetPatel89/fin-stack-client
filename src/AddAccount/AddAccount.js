import React, { Component } from 'react';

export default class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: ''
        }
    }

    

   

    render () {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="account">
                        Name:
                    </label>
                    <input placeholder="discover bank" type="text" id="account" value={this.state.value} onChange={this.handleChange} required />
                    <button className="account-submit" type="submit">Submit</button>
                    {this.state.error}
                    <button className="cancel" onClick={this.props.handleClick}>Cancel</button>
                </form>
            </>
        )
    }
}