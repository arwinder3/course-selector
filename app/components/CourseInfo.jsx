import React from "react";

export default class CourseInfo extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemoveFromCalendar = this.handleRemoveFromCalendar.bind(this);
    }

    handleRemoveFromCalendar() {
        const updatedCalendar = Object.assign({}, this.props.activeCalendar);
        updatedCalendar.courseIds = this.props.activeCalendar.courseIds.filter(courseId => courseId !== this.props.activeCourse.id);
        this.props.onCalendarUpdate(updatedCalendar);
        this.props.clearActiveCourse();
    }

    render() {
        return (
            <div className="course-info-container group">
                <div className="course-info-title-container">
                    <div className="course-info-title-left">
                        <strong>{this.props.activeCourse.name}</strong>
                    </div>
                    <div className="course-info-title-right">
                        <div className="course-info-title-right-half">
                            <span>{this.props.activeCourse.days.map(day => day.substring(0, 3)).join(", ")}</span>
                        </div>
                        <div className="course-info-title-right-half">
                            <span>{this.props.activeCourse.time.join(", ")}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span>{`${this.props.activeCourse.author}`}</span>
                </div>
                <div className="course-info-footer">
                    <button className="cs-button" onClick={this.handleRemoveFromCalendar}>
                        <i className="fa fa-calendar-minus-o"></i> Remove from Calendar
                    </button>
                </div>
            </div>
        );
    }
}

CourseInfo.propTypes = {
    activeCourse: React.PropTypes.object,
    activeCalendar: React.PropTypes.object,
    onCalendarUpdate: React.PropTypes.func,
    clearActiveCourse: React.PropTypes.func
};
