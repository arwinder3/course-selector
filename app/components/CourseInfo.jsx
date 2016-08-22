import React from "react";

export default class CourseInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="course-info-container group">
                <div className="course-info-title-container">
                    <div className="course-info-title">{this.props.activeCourse.name}</div>
                    <span>{this.props.activeCourse.days.map(day => day.substring(0, 3)).join(", ")}</span> <span>{this.props.activeCourse.time.join(", ")}</span>
                </div>
            </div>
        );
    }
}
