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
            if (this.props.activeCalendarCellIndexes &&
                this.props.activeCalendarCellIndexes.timeIndex.indexOf(this.props.timeIndex) !== -1 &&
                this.props.activeCalendarCellIndexes.dayIndex.indexOf(this.props.dayIndex) !== -1) {
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

    render() {
        return (
            <td
                className={this.getCellClassName()}
                onClick={this.handleCellClick}></td>
        );
    }
}

DayCell.propTypes = {
    dayIndex: React.PropTypes.number,
    timeIndex: React.PropTypes.number,
    calendar: React.PropTypes.object,
    courseList: React.PropTypes.array,
    onCellClick: React.PropTypes.func,
    activeCalendarCellIndexes: React.PropTypes.object
};
