import React from "react";

export class AddTraining extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseName: "",
      error: ""
    };
  }

  updateExerciseName = e => {
    this.setState(
      {
        exerciseName: e.target.value
      },
      () => this.runValidation()
    );
  };

  areAllFieldsValid = error => error === "";

  runValidation = () => {
    let error = "";

    if (this.state.exerciseName === "") {
      error = "Pole jest puste";
    }

    if (/[0-9]+/.test(this.state.exerciseName)) {
      error = "Nie wpisuj liczb";
    }

    this.setState({
      error
    });

    return error;
  };

  addExercise = () => {
    const isValidationCorrect = this.runValidation();
    if (this.areAllFieldsValid(isValidationCorrect)) {
      this.props.addExercise(this.state.exerciseName);
      this.setState({
        exerciseName: ""
      });
    }
  };

  getExercisesList = () => {
    return this.props.exercises.map(exercise => (
      <div key={exercise.id} className="exerciseHolder">
        <div>
          <li
            className="exercisesList"
            onClick={() => this.props.selectExercise(exercise)}
          >
            {exercise.text}
          </li>
        </div>
        <button
          className="deleteExerciseButton"
          onClick={() => {
            const decision = window.confirm("Do you really want to delete?");
            if (decision) {
              this.props.deleteExercise(exercise.id);
            }
          }}
        >
          Usuń
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div className="exercisesContainer">
        <div>
          <div>
            <input
              className="addExerciseInput"
              type="text"
              placeholder="dodaj zadanie"
              value={this.state.exerciseName}
              onChange={this.updateExerciseName}
            />
            <button className="addExercisebutton" onClick={this.addExercise}>
              Dodaj
            </button>
          </div>
          <div>{this.state.error}</div>
          <ul>{this.getExercisesList()}</ul>
        </div>
      </div>
    );
  }
}
