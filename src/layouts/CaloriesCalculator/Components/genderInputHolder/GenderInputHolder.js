import React from "react";
import "./GenderInputHolder.css";

export class GenderInputHolder extends React.Component {
  render() {
    return (
      <div className="genderInputContainer">
        <div className="genderInputDescribe">
          <label>Płeć:</label>
        </div>
        <div className="genderHolder">
          <span
            className={this.props.femaleClass + " " + `radio-btn`}
            name={this.props.female}
            onClick={this.props.onClick}
          ></span>
          <span className="genderOption">K</span>
        </div>
        <div className="genderHolder">
          <span
            className={this.props.maleClass + " " + `radio-btn`}
            name={this.props.male}
            onClick={this.props.onClick}
          ></span>
          <span className="genderOption">M</span>
        </div>
      </div>
    );
  }
}
