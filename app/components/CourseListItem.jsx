import React from "react";

export default class CourseListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    courseSelectionClassNames() {
        let classNames = ["fa"];

        if (this.props.isSelected) {
            classNames.push("fa-calendar-check-o");
        }

        return classNames.join(" ");
    }

    getCourseItemClassNames() {
        let classNames = ["course-list-item group"];

        if (this.props.isSelected) {
            classNames.push("selected");
        }

        return classNames.join(" ");
    }

    render() {
        const formattedAuthor = (this.props.author.length > 35) ?
            `${this.props.author.substring(0, 35)}...` : this.props.author;
        const formattedCourseTitle = (this.props.name.length > 35) ?
            `${this.props.name.substring(0, 35)}...` : this.props.name;
        return (
            <div
                className={this.getCourseItemClassNames()}
                onClick={this.props.onCourseSelection}>
                <div className="course-selection-container">
                    <div><i className={this.courseSelectionClassNames()}></i></div>
                </div>
                <div className="course-details">
                    <div className="top-section">
                        <span title={this.props.name} className="course-title">{formattedCourseTitle}</span>
                    </div>
                    <div className="bottom-section">
                        <span title={this.props.author} className="course-author">{formattedAuthor}</span>
                    </div>

                </div>
            </div>
        );
    }
}

CourseListItem.propTypes = {
    name: React.PropTypes.string,
    onCourseSelection: React.PropTypes.func
};
