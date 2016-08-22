import React from "react";

import CourseListItem from "./CourseListItem";

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCourseSelection() {
        this.props.onMessage("");
        const updatedCalendar = Object.assign({}, this.props.calendar),
            updatedCourseIds = this.props.calendar.courseIds.slice(0);
        if (updatedCourseIds.indexOf(this.course.id) !== -1) {
            // Remove from Calendar
            updatedCalendar.courseIds = updatedCourseIds.filter(courseId => courseId !== this.course.id);
            this.props.onCalendarUpdate(updatedCalendar);
        } else {
            const courseConflicts = this.self._getCourseConflicts(this.props.calendar, this.props.courseList, this.course);
            if (courseConflicts.length === 0) {
                // No conflicts, add to calendar
                updatedCourseIds.push(this.course.id);
                updatedCalendar.courseIds = updatedCourseIds;
                this.props.onCalendarUpdate(updatedCalendar);
            } else {
                // Conflict(s) detected, show message
                const conflictCourseNames = this.self._getConflictCourseNames(courseConflicts);
                this.props.onMessage(`Unable to add "${this.course.name}" to your calendar due to a conflict with ${conflictCourseNames}.`);
            }
        }
    }

    _getCourseConflicts(calendar, courseList, courseToBeAdded) {
        return courseList.filter(course => {
            return calendar.courseIds.indexOf(course.id) !== -1 &&
                course.id !== courseToBeAdded.id &&
                course.dayIndex
                    .filter(dayIndex => courseToBeAdded.dayIndex.indexOf(dayIndex) !== -1)
                    .length > 0 &&
                course.timeIndex
                    .filter(timeIndex => courseToBeAdded.timeIndex.indexOf(timeIndex) !== -1)
                    .length > 0;
        });
    }

    _getConflictCourseNames(courseConflicts) {
        return courseConflicts
            .reduce((namesList, conflictCourse, index, array) => {
                if (array.length - 1 === index && namesList.length > 0) {
                    namesList.push(` and "${conflictCourse.name}"`);
                } else {
                    namesList.push(`"${conflictCourse.name}"`);
                }

                return namesList;
            }, []).join(", ");
    }

    render() {
        return (
            <div className="course-list-container">
                <div className="course-list-heading">Courses</div>
                <div className="course-list">
                    {
                        this.props.courseList.map(course => (
                            <CourseListItem
                                key={course.id}
                                isSelected={this.props.calendar.courseIds.indexOf(course.id) !== -1}
                                onCourseSelection={this.handleCourseSelection.bind({
                                    self: this,
                                    props: this.props,
                                    course: course
                                })}
                                {...course}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

CourseList.propTypes = {
    courseList: React.PropTypes.array,
    calendar: React.PropTypes.object,
    onCalendarUpdate: React.PropTypes.func,
    onMessage: React.PropTypes.func
};
