// Copyright 2004-present Facebook. All Rights Reserved.

import {Component} from 'react';

export default class CheckboxWithLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {isChecked:false};
    }

    onChange() {
        this.setState({isChecked: !this.state.isChecked});
    }

    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange.bind(this)}
                />
                {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
            </label>
        );
    }
}
