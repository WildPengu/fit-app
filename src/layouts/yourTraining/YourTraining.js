import React from "react";
import "./YourTraining.css";

class yourTraining extends React.Component {
  exerciseIdCounter = 3;
  dateIdCounter = 3;
  seriesCounter = 0;
  state = {
    lastAddedDate: "",
    clickedDate: "",
    clickedExercise: "",
    text: "",
    number: "",
    exercises: [
      {
        id: 0,
        text: "Bench press"
      },
      {
        id: 1,
        text: "Pushups"
      },
      {
        id: 2,
        text: "Squats"
      }
    ],
    calendar: [
      {
        id: 0,
        date: "05-12-2019"
      },
      {
        id: 1,
        date: "06-12-2019"
      },
      {
        id: 2,
        date: "08-12-2019"
      }
    ],
    userSeries: [],
    error: "",
    repetitions: []
  };

  addTrainingToState = (dateId, exerciseId) => {
    this.setState(prevState => ({
      repetitions: [...prevState.repetitions, this.state.number]
    }));

    let makeNewSeries = false;

    for (let el of this.state.userSeries) {
      if (el.dateId === dateId && el.dateId === exerciseId) {
        this.setState({
          repetitions: this.state.number
        });
        console.log("dupa");
      } else {
        makeNewSeries = true;
        console.log("dddddupa");
      }
    }

    if (makeNewSeries) {
      const series = {
        id: this.seriesCounter,
        dateId: dateId.id,
        exerciseId: exerciseId.id,
        repetitions: this.state.repetitions
      };

      let isdDateValid = true;
      let isdExerciseValid = true;
      for (let el of this.state.userSeries) {
        if (el.dateId === series.dateId) {
          isdDateValid = false;
        }
        if (el.exerciseId === series.exerciseId) {
          isdExerciseValid = false;
        }
      }

      if (isdDateValid || isdExerciseValid) {
        this.seriesCounter++;
        this.setState(prevState => ({
          userSeries: [...prevState.userSeries, series]
        }));
      }
      console.log("XD");
    }
  };

  addExerciseToState = text => {
    const exercise = {
      id: this.exerciseIdCounter,
      text
    };
    this.exerciseIdCounter++;

    this.setState(prevState => ({
      exercises: [...prevState.exercises, exercise],
      text: ""
    }));
  };

  updateInputValue = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  addExercise = () => {
    const taskNameValidationError = this.runValidation();
    if (this.areAllFieldsValid(taskNameValidationError)) {
      this.addExerciseToState(this.state.text);
    }
  };

  deleteExercise = id => {
    const decision = window.confirm("Do you really want to delete?");
    if (decision) {
      this.setState({
        exercises: this.state.exercises.filter(exercise => exercise.id !== id)
      });
    }
  };

  addDate = () => {
    let calendar = new Date(),
      today =
        calendar.getDate() +
        "-" +
        (calendar.getMonth() + 1) +
        "-" +
        calendar.getFullYear();

    const date = {
      id: this.dateIdCounter,
      date: today
    };
    this.dateIdCounter++;
    this.setState(prevState => ({
      calendar: [...prevState.calendar, date],
      lastAddedDate: today
    }));
  };

  runValidation = () => {
    let error = "";

    if (this.state.text === "") {
      error = "Pole jest puste";
    }

    if (/[0-9]+/.test(this.state.text)) {
      error = "Nie wpisuj liczb xD";
    }

    this.setState({
      error
    });

    return error;
  };

  areAllFieldsValid = error => error === "";

  render() {
    const allExercises = this.state.exercises.map(exercise => (
      <div key={exercise.id} className="exerciseHolder">
        <div>
          <li
            className="exercisesList"
            onClick={() => this.setState({ clickedExercise: exercise })}
          >
            {exercise.text}
          </li>
        </div>
        <button
          className="deleteExerciseButton"
          onClick={() => this.deleteExercise(exercise.id)}
        >
          Usuń
        </button>
      </div>
    ));

    const allDates = this.state.calendar.map(training => (
      <div key={training.id}>
        <li
          className="trainingDateList"
          onClick={() => this.setState({ clickedDate: training })}
        >
          {training.date}
        </li>
      </div>
    ));

    const sets = this.state.userSeries.map(set => (
      <div key={set.id}>
        <div>{set.dateId + " " + set.exerciseId}</div>
      </div>
    ));

    let calendar = new Date(),
      today =
        calendar.getDate() +
        "-" +
        (calendar.getMonth() + 1) +
        "-" +
        calendar.getFullYear();

    return (
      <div className="mainContainer">
        <div className="exercisesContainer">
          <div>
            <div>
              <input
                className="addExerciseInput"
                type="text"
                name="text"
                placeholder="dodaj zadanie"
                value={this.state.text}
                onChange={this.updateInputValue}
              />
              <button className="addExercisebutton" onClick={this.addExercise}>
                Dodaj
              </button>
            </div>
            <div>{this.state.error}</div>
            <ul>{allExercises}</ul>
          </div>
        </div>
        <div className="trainingContainer">
          <div className="clickedExerciseAndDateContainer">
            <span className="clickedExercise">
              {this.state.clickedExercise !== ""
                ? this.state.clickedExercise.text
                : ""}
            </span>
            <span className="clickedDate">
              {this.state.clickedDate !== "" ? this.state.clickedDate.date : ""}
            </span>
          </div>
          <div className="addSeriesHolder">
            <div>
              <input
                type="number"
                name="number"
                className="seriesRepeatInput"
                onChange={this.updateInputValue}
              ></input>
            </div>
            <div>
              <button
                onClick={() =>
                  this.addTrainingToState(
                    this.state.clickedDate,
                    this.state.clickedExercise,
                    this.state.number
                  )
                }
                className="addSeriesButton"
              >
                Dodaj
              </button>
            </div>
          </div>
          <div>{this.state.repetitions}</div>
          <div>{this.state.userSeries.repetitions}</div>
        </div>
        <div className="calendarContainer">
          <div>
            {this.state.lastAddedDate !== today ? (
              <button onClick={this.addDate} className="dateButton">
                Dodaj trening
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="trainingDatesCointainer">
            <ul>{allDates}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default yourTraining;
