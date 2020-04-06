import React from "react";
import Header from "../Header.js";
import { BmiCalculator } from "../BmiCalculator/BmiCalculator";
import { Calories } from "../CaloriesCalculator/Calories";
import yourTraining from "../yourTraining/YourTraining";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="contentContainer">
          <div className="imageHolder">
            <div className="informationsContainer">
              <Route exact path="/fit-app" component={BmiCalculator} />
              <Route path="/calories" component={Calories} />
              <Route path="/yourTraining" component={yourTraining} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
