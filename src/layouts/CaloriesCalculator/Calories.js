import React from "react";
import "./Calories.css";
import _ from "lodash";
import CaloriesInfo from "./CaloriesInfo";
import PrimaryButton from "../../components/primaryButton/PrimaryButton.js";
import { InputField } from "../../components/inputField/InputField";
import ActivityLevel from "./Components/activityLevel/ActivityLevel";
import { GenderInputHolder } from "./Components/genderInputHolder/GenderInputHolder";

export class Calories extends React.Component {
  state = {
    weight: "",
    height: "",
    age: "",
    gender: "genderMale",
    activityLevel: "1.2",
    calories: "",
    bmr: "",
    isValid: "",
    errors: {
      height: "",
      weight: "",
      age: ""
    }
  };

  calculateBmr = (height, weight, age) => {
    let bmr;
    if (this.state.gender === "genderMale") {
      bmr = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    }
    if (this.state.gender === "genderFemale") {
      bmr = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
    }
    bmr = bmr.toFixed(2);
    this.setState({
      bmr
    });
    return bmr;
  };

  genderOnClick = e => {
    let gender = e.target.getAttribute("name");
    if (gender === "genderMale") {
      this.setState({
        gender: "genderMale"
      });
    }
    if (gender === "genderFemale") {
      this.setState({
        gender: "genderFemale"
      });
    }
    return this.state.gender;
  };

  calculateCaloriesRequired = activityLevel => {
    let bmr = this.calculateBmr(
      this.state.height,
      this.state.weight,
      this.state.age
    );
    let calories = bmr * activityLevel;
    calories = calories.toFixed(2);
    this.setState({
      calories
    });
    return calories;
  };

  updateFieldsValue = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  runValidation = () => {
    let errors = {
      height: "",
      weight: "",
      age: ""
    };

    if (this.state.height === "") {
      errors.height = "Podaj wzrost";
    }
    if (this.state.weight === "") {
      errors.weight = "Podaj wagę";
    }
    if (this.state.age === "") {
      errors.age = "Podaj wiek";
    }

    this.setState({
      errors
    });

    return errors;
  };

  allFieldsValid = errors => {
    let isValid = true;
    _.forEach(errors, (item, key) => {
      if (item !== "") {
        isValid = false;
        this.setState({ isValid: false });
      }
    });
    return isValid;
  };

  calculateCalories = e => {
    const caloriesValidationError = this.runValidation();
    if (this.allFieldsValid(caloriesValidationError)) {
      this.setState({ isValid: true });
      this.calculateCaloriesRequired(this.state.activityLevel);
    }
  };

  render() {
    let genderMaleClass =
      this.state.gender === "genderMale" ? "black" : "white";
    let genderFemaleClass =
      this.state.gender === "genderFemale" ? "black" : "white";
    return (
      <>
        <div className="caloriesInfoContainer">
          <h2>Oblicz dzienne zapotrzebowanie na kalorie</h2>
          <GenderInputHolder
            maleClass={genderMaleClass}
            femaleClass={genderFemaleClass}
            male="genderMale"
            female="genderFemale"
            onClick={this.genderOnClick}
          />
          <InputField
            label="Wiek:"
            name="age"
            value={this.state.age}
            onChange={this.updateFieldsValue}
            units="(18-99)"
            error={this.state.errors.age}
          />
          <InputField
            label="Waga:"
            name="weight"
            value={this.state.weight}
            onChange={this.updateFieldsValue}
            units="kg"
            error={this.state.errors.weight}
          />
          <InputField
            label="Wzrost:"
            name="height"
            value={this.state.height}
            onChange={this.updateFieldsValue}
            units="cm"
            error={this.state.errors.height}
          />
          <ActivityLevel
            name="activityLevel"
            onChange={this.updateFieldsValue}
          />
          <div className="buttonContainer">
            <PrimaryButton onClick={this.calculateCalories}>
              Oblicz
            </PrimaryButton>
          </div>
          <div>
            {this.state.isValid === true
              ? "Twój wynik bmr to:" + this.state.bmr
              : null}
          </div>
          <div>
            {this.state.isValid === true
              ? "Twoje dzienne zapotrzebowanie kalorii:" + this.state.calories
              : null}
          </div>
        </div>
        <CaloriesInfo />
      </>
    );
  }
}
