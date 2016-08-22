import React from "react";

export default class Messages extends React.Component {
    constructor(props) {
        super(props);

        this._timeoutId = null;
    }

    componentDidUpdate() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }

        if (this.props.message.length > 0) {
            this._timeoutId = setTimeout(() => {
                this.props.onMessageDismiss("");
                this._timeoutId = null;
            }, 4000);
        }
    }

    getMessageClassNames() {
        const classNames = ["messages-container"];

        if (this.props.message.length === 0) {
            classNames.push("hide");
        }

        return classNames.join(" ");
    }

    render() {
        return (
            <div className={this.getMessageClassNames()}>{this.props.message}</div>
        );
    }
}

Messages.propTypes = {
    message: React.PropTypes.string,
    onMessageDismiss: React.PropTypes.func
};
