import React from "react";

export default class DayCell extends React.Component {
    constructor(props) {
        super(props);

        this.handleCellClick = this.handleCellClick.bind(this);
    }

    getCellClassName() {
        const classNames = [];

        if (this.props.courseList.filter(course => (
            this.props.calendar.courseIds.indexOf(course.id) !== -1 &&
            course.dayIndex.indexOf(this.props.dayIndex) !== -1 &&
            course.timeIndex.indexOf(this.props.timeIndex) !== -1
        )).length > 0) {
            classNames.push("busy");
            if (this.props.activeCourse &&
                this.props.activeCourse.timeIndex.indexOf(this.props.timeIndex) !== -1 &&
                this.props.activeCourse.dayIndex.indexOf(this.props.dayIndex) !== -1) {
                classNames.push("active");
            }
        } else {
            classNames.push("free");
        }

        return classNames.join(" ");
    }

    handleCellClick() {
        this.props.onCellClick(this.props.timeIndex, this.props.dayIndex);
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
            <td
                className={this.getCellClassName()}
                onClick={this.handleCellClick}>{this.formatTimeCell()}</td>
        );
    }
}

DayCell.propTypes = {
    dayIndex: React.PropTypes.number,
    timeIndex: React.PropTypes.number,
    calendar: React.PropTypes.object,
    courseList: React.PropTypes.array,
    onCellClick: React.PropTypes.func,
    activeCourse: React.PropTypes.object
};
