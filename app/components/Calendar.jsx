import React from "react";

/* Components */
import CalendarRow from "./CalendarRow";
import CourseInfo from "./CourseInfo";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeStart: 7,
            timeEnd: 16,
            calendarDays: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
            editCalendarName: false
        };

        this.handleCalendarEditModeOn = this.handleCalendarEditModeOn.bind(this);
        this.handleCalendarNameOnBlur = this.handleCalendarNameOnBlur.bind(this);
        this.handleCalendarNameOnKeyPress = this.handleCalendarNameOnKeyPress.bind(this);
    }

    populateTable() {
        let rows = [];

        for (let i = this.state.timeStart; i <= this.state.timeEnd; i++) {
            rows.push(<CalendarRow
                key={i}
                timeIndex={i}
                courseList={this.props.courseList}
                calendar={this.props.activeCalendar}
                onCellClick={this.props.onCellClick}
                activeCourse={this.props.activeCourse}/>);
        }

        return rows;
    }

    render() {
        if (this.props.activeCalendar) {
            return this.renderCalendarView();
        } else {
            return this.renderLoadingView();
        }
    }

    renderLoadingView() {
        return (
            <div>
                Loading Calendar...
            </div>
        );
    }

    handleCalendarEditModeOn() {
        this.setState({
            editCalendarName: true
        });
    }

    handleCalendarNameOnBlur(e) {
        this.finishCalendarNameEdit(e.target.value);
    }

    handleCalendarNameOnKeyPress(e) {
        if (e.key && e.key === "Enter") {
            this.finishCalendarNameEdit(e.target.value);
        }
    }

    finishCalendarNameEdit(newName) {
        const updatedCalendar = Object.assign({}, this.props.activeCalendar);
        updatedCalendar.name = newName;
        this.props.onCalendarUpdate(updatedCalendar);
        this.setState({
            editCalendarName: false
        });
    }

    renderCalendarView() {
        return (
            <div className="calendar-container">
                <div className="calendar-header">
                    {
                        (this.state.editCalendarName) ?
                        <input
                            className="edit-header-title"
                            defaultValue={this.props.activeCalendar.name}
                            onBlur={this.handleCalendarNameOnBlur}
                            onKeyPress={this.handleCalendarNameOnKeyPress}
                            autoFocus/>
                        : <span className="calendar-title">{this.props.activeCalendar.name}</span>
                    }
                    <i
                        className="fa fa-edit"
                        onClick={this.handleCalendarEditModeOn}></i>
                </div>

                <div className="calendar-main">
                    <div className="calendar-table-container">
                        <table className="calendar-table">
                            <thead>
                                <tr>
                                    {this.state.calendarDays.map(day => <th key={day}>{day}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.populateTable()}
                            </tbody>
                        </table>
                        <div className="table-legend-container group">
                            <span className="busy-legend">Busy</span>
                            <span className="free-legend">Free</span>
                        </div>
                    </div>
                    <div className="course-info-wrapper">
                        {
                            (this.props.activeCourse) ?
                                <CourseInfo
                                    activeCourse={this.props.activeCourse}
                                    activeCalendar={this.props.activeCalendar}
                                    onCalendarUpdate={this.props.onCalendarUpdate}
                                    clearActiveCourse={this.props.clearActiveCourse}/> : null
                        }
                    </div>
                </div>

            </div>
        );
    }
}

Calendar.propTypes = {
    courseList: React.PropTypes.array,
    calendars: React.PropTypes.object,
    activeCalendar: React.PropTypes.object,
    onCalendarUpdate: React.PropTypes.func,
    onCellClick: React.PropTypes.func,
    activeCourse: React.PropTypes.object,
    clearActiveCourse: React.PropTypes.func
};
