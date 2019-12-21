import React from "react";
import "./ActivityLevel.css";

export default props => {
  return (
    <div className="exerciseLevelContainer">
      <label className="exerciseLevelTitle">Poziom aktywności fizycznej:</label>
      <select name={props.name} onChange={props.onChange}>
        <option value="1.2">Brak aktywności fizycznej</option>
        <option value="1.4">Mała aktywność fizyczna (1-3 tygodniowo)</option>
        <option value="1.6">średnia aktywność fizyczna (3-5 tygodniowo)</option>
        <option value="1.8">Duża aktywność fizyczna (codziennie)</option>
        <option value="2">Bardzo duża aktywnosć fizyczna</option>
      </select>
    </div>
  );
};
