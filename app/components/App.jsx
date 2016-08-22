import React from "react";

/* Components */
import CourseList from "./CourseList";
import Calendar from "./Calendar";
import Messages from "./Messages";

/* Utils */
import {getAllCourses} from "../utils/CourseService";
import {getAllCalendarsForUserId, updateCalendar} from "../utils/UserService";

const SiteHeader = () => (
    <div className="site-header">
        <span className="site-title"><i className="fa fa-university"></i> Course Selector</span>
    </div>
);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            courses: [],
            activeUserId: 0,
            calendars: {},
            calendarMaps: {},
            activeCalendarCellIndexes: null,
            activeCourse: null
        };

        this.handleMessage = this.handleMessage.bind(this);
        this.handleCalendarUpdate = this.handleCalendarUpdate.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.clearActiveCourse = this.clearActiveCourse.bind(this);
    }

    componentWillMount() {
        getAllCalendarsForUserId(this.state.activeUserId)
            .then(calendars => {
                this.setState({
                    calendars: calendars,
                    activeCalendarId: (Object.keys(calendars).length > 0) ? Object.keys(calendars)[0] : null
                });
            });

        getAllCourses()
            .then(courses => {
                this.setState({
                    courses: courses
                });
            });
    }

    handleMessage(message) {
        this.setState({
            message: message
        });
    }

    clearMessage() {
        this.setState({
            message: ""
        });
    }

    handleCalendarUpdate(newCalendar) {
        this.clearMessage();
        updateCalendar(this.state.activeUserId, this.state.activeCalendarId, newCalendar)
            .then(data => {
                if (data.status === 200) {
                    const updatedCalendars = Object.assign({}, this.state.calendars);
                    updatedCalendars[this.state.activeCalendarId] = newCalendar;
                    this.setState({
                        calendars: updatedCalendars
                    });
                } else if (data.status === 400) {
                    this.handleMessage(data.error);
                }
            })
            .catch(err => {
                this.handleMessage("Error updating calendar name. Please try again.");
                console.log("Error updating calendar", err);
            });
    }

    handleCellClick(timeIndex, dayIndex) {
        const courseIds = this.state.calendars[this.state.activeCalendarId].courseIds;
        let found = false;
        const filteredCourses = this.state.courses.filter(course => courseIds.indexOf(course.id) !== -1);
        for (let i = 0, iLen = courseIds.length; i < iLen; i++) {
            if (found) {
                break;
            }

            for (let j = 0, jLen = filteredCourses.length; j < jLen; j++) {
                if (filteredCourses[i].timeIndex.indexOf(timeIndex) !== -1 &&
                    filteredCourses[i].dayIndex.indexOf(dayIndex) !== -1) {
                    this.setState({
                        activeCourse: filteredCourses[i],
                        activeCalendarCellIndexes: {
                            timeIndex: filteredCourses[i].timeIndex.slice(0),
                            dayIndex: filteredCourses[i].dayIndex.slice(0)
                        }
                    });
                    found = true;
                    break;
                }
            }
        }
    }

    clearActiveCourse(activeCourse) {
        const newActiveCourse = activeCourse || null;
        this.setState({
            activeCourse: newActiveCourse
        });
    }

    render() {
        return (
            <div className="app-container">
                <SiteHeader />
                <div className="main-content-container">
                    <div className="course-list-wrapper">
                        <CourseList
                            courseList={this.state.courses}
                            onCalendarUpdate={this.handleCalendarUpdate}
                            calendar={this.state.calendars[this.state.activeCalendarId]}
                            onMessage={this.handleMessage}
                            activeCourse={this.state.activeCourse}
                            clearActiveCourse={this.clearActiveCourse}/>
                    </div>
                    <div className="calendar-messages-wrapper">
                        <Messages
                            message={this.state.message}
                            onMessageDismiss={this.clearMessage} />
                        <Calendar
                            courseList={this.state.courses}
                            calendars={this.state.calendars}
                            activeCalendar={this.state.calendars[this.state.activeCalendarId]}
                            onCalendarUpdate={this.handleCalendarUpdate}
                            onCellClick={this.handleCellClick}
                            activeCourse={this.state.activeCourse}
                            clearActiveCourse={this.clearActiveCourse}/>
                    </div>
                </div>
            </div>
        );
    }

}
