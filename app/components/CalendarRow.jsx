import React from "react";

/* Components */
import CalendarCell from "./CalendarCell";

export default class CalendarRow extends React.Component {
    constructor(props) {
        super(props);
    }

    createCalendarCells() {
        const calendarCells = [];
        for (let i = 0; i < 7; i++) {
            calendarCells.push(
                <CalendarCell
                    key={i}
                    dayIndex={i}
                    timeIndex={this.props.timeIndex}
                    calendar={this.props.calendar}
                    courseList={this.props.courseList}
                    onCellClick={this.props.onCellClick}
                    activeCourse={this.props.activeCourse}/>
            );
        }
        return calendarCells;
    }

    render() {
        return (
            <tr>
                {this.createCalendarCells()}
            </tr>
        );
    }

}

CalendarRow.propTypes = {
    timeIndex: React.PropTypes.number,
    courseList: React.PropTypes.array,
    calendar: React.PropTypes.object,
    onCellClick: React.PropTypes.func,
    activeCourse: React.PropTypes.object
};
