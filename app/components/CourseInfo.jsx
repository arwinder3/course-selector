import React from "react";

export default class CourseInfo extends React.Component {
    constructor(props) {
        super(props);
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
                    <span>{`Author: ${this.props.activeCourse.author}`}</span>
                </div>
                <div className="course-info-footer">
                    <button className="cs-button"><i className="fa fa-remove"></i> Remove from Calendar</button>
                </div>
            </div>
        );
    }
}
