import React from "react";
import "./InputField.css";

export class InputField extends React.Component {
  render() {
    return (
      <div className="inputBox">
        <div className="innerInputBox">
          <label className="inputDescribe">{this.props.label}</label>
          <div>
            <input
              type="number"
              className="inputHolder"
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
            ></input>
          </div>
          <span className="inputUnits">{this.props.units}</span>
        </div>
        {this.props.error}
      </div>
    );
  }
}
