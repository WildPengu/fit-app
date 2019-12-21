import React from "react";
import _ from "lodash";
import BmiRanges from "./components/BmiRanges";
import { InputField } from "../../components/inputField/InputField";
import PrimaryButton from "../../components/primaryButton/PrimaryButton";
import "../../components/primaryButton/PrimaryButton.css";
import { BmiInfo } from "./BmiInfo";

export class BmiCalculator extends React.Component {
  state = {
    weight: "",
    height: "",
    message: "",
    result: "",
    bmiRanges: [
      {
        min: 0,
        max: 16,
        result: "wygłodzenie"
      },
      {
        min: 16,
        max: 17,
        result: "wychudzenie"
      },
      {
        min: 17,
        max: 18.5,
        result: "niedowaga"
      },
      {
        min: 18.5,
        max: 25,
        result: "wartość prawidłowa"
      },
      {
        min: 25,
        max: 30,
        result: "nadwaga"
      },
      {
        min: 30,
        max: 35,
        result: "I stopień otyłości"
      },
      {
        min: 35,
        max: 40,
        result: "II stopień otyłości"
      },
      {
        min: 40,
        max: 10000,
        result: "otyłość skrajna"
      }
    ],
    errors: {
      weight: "",
      height: ""
    }
  };

  runBmiCalculating = (height, weight) => {
    const bmi = this.calculateBmi(height, weight);
    this.setState({
      message: this.mapBmiToText(bmi),
      result: bmi.toFixed(2)
    });
  };

  calculateBmi = (height, weight) => {
    let modifiedHeight = height / 100;
    return weight / (modifiedHeight * modifiedHeight);
  };

  mapBmiToText = result => {
    for (let el of this.state.bmiRanges) {
      if (el.min < result && el.max > result) {
        return el.result;
      }
    }
  };

  updateFieldValue = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  runValidation = () => {
    let errors = {
      height: "",
      weight: ""
    };

    if (this.state.height === "") {
      errors.height = "podaj wzrost";
    }

    if (this.state.weight === "") {
      errors.weight = "podaj wagę";
    }

    this.setState({
      errors
    });

    return errors;
  };

  areAllFieldsValid = errors => {
    let isValid = true;
    _.forEach(errors, (item, key) => {
      if (item !== "") {
        isValid = false;
      }
    });
    return isValid;
  };

  bmiEndingResult = e => {
    const bmiValidationError = this.runValidation();
    if (this.areAllFieldsValid(bmiValidationError)) {
      console.log(this.state);
      this.runBmiCalculating(this.state.height, this.state.weight);
    }
  };

  render() {
    return (
      <>
        <div className="mainInformationContainer">
          <h2 className="mainInformationTitle">Oblicz swój wskaźnik BMI</h2>
          <InputField
            label="Waga:"
            units="kg"
            name="weight"
            error={this.state.errors.weight}
            value={this.state.weight}
            onChange={this.updateFieldValue}
          />

          <InputField
            label="Wzrost:"
            units="cm"
            name="height"
            error={this.state.errors.height}
            value={this.state.height}
            onChange={this.updateFieldValue}
          />

          <div className="calculateButtonHolder">
            <PrimaryButton onClick={this.bmiEndingResult}>Oblicz</PrimaryButton>
          </div>
          <BmiRanges />
          <div>
            {this.state.message !== ""
              ? "Twój wynik BMI: " +
                this.state.result +
                "-" +
                this.state.message
              : ""}
          </div>
        </div>
        <BmiInfo />
      </>
    );
  }
}
