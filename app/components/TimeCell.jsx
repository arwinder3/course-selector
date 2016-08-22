import React from "react";

export default class TimeCell extends React.Component {
    constructor(props) {
        super(props);
    }

    formatTimeCell() {
        let time = this.props.timeIndex;
        if (time === 12) {
            return `${time}pm`;
        } else if (time > 12) {
            return `${time - 12}pm`;
        } else {
            return `${time}am`;
        }
    }

    render() {
        return (
            <td>{this.formatTimeCell()}</td>
        );
    }
}
