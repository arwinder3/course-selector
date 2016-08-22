import React from "react";

/* Components */
import TimeCell from "./TimeCell";
import DayCell from "./DayCell";

export default class CalendarRow extends React.Component {
    constructor(props) {
        super(props);
    }

    createDayCells() {
        const dayCells = [];
        for (let i = 0; i < 7; i++) {
            dayCells.push(
                <DayCell
                    key={i}
                    dayIndex={i}
                    timeIndex={this.props.timeIndex}
                    calendar={this.props.calendar}
                    courseList={this.props.courseList}
                    onCellClick={this.props.onCellClick}
                    activeCalendarCellIndexes={this.props.activeCalendarCellIndexes}/>
            );
        }
        return dayCells;
    }

    render() {
        return (
            <tr>
                <TimeCell timeIndex={this.props.timeIndex}/>
                {this.createDayCells()}
            </tr>
        );
    }

}

CalendarRow.propTypes = {
    timeIndex: React.PropTypes.number,
    courseList: React.PropTypes.array,
    calendar: React.PropTypes.object,
    onCellClick: React.PropTypes.func,
    activeCalendarCellIndexes: React.PropTypes.object
};
