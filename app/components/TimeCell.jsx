import React from "react";

export default class TimeCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <td>{this.props.timeIndex}</td>
        );
    }
}
