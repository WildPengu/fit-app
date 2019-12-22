import React from "react";
import "./YourTraining.css";

class yourTraining extends React.Component {
  exerciseIdCounter = 3;
  dateIdCounter = 3;
  seriesCounter = 0;
  state = {
    lastAddedDate: "",
    clickedDate: "", // active date
    clickedExercise: "", // active exercise
    text: "", // that doesn't say anything
    number: "", // that doesn't say anything
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
      // dates
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
    activeSeries: null,
    error: "" // this should be deleted or renamed
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

  addNewSeriesToRepetitions = amount => {
    this.setState({
      ...this.state,
      activeSeries: {
        ...this.state.activeSeries,
        repetitions: [...this.state.activeSeries.repetitions, amount]
      }
    });
    console.log(this.state.userSeries.repetitions);
    console.log(amount);
  };

  getActiveSeries = (dateId, exerciseId) => {
    for (let el of this.state.userSeries) {
      if (el.dateId === dateId && el.exerciseId === exerciseId) {
        return el;
      }
    }
    const series = {
      dateId,
      exerciseId: exerciseId.id,
      repetitions: []
    };
    this.setState(prevState => ({
      userSeries: [...prevState.userSeries, series]
    }));
    return series;
  };

  selectDate = training => {
    let activeSeries = null;
    if (this.state.clickedExercise) {
      activeSeries = this.getActiveSeries(
        training.id,
        this.state.clickedExercise
      );
    }
    this.setState({ clickedDate: training, activeSeries });
  };

  selectExercise = exercise => {
    let activeSeries = null;
    if (this.state.clickedDate) {
      activeSeries = this.getActiveSeries(this.state.clickedDate, exercise.id);
    }
    this.setState({ clickedExercise: exercise, activeSeries });
  };

  render() {
    const allExercises = this.state.exercises.map(exercise => (
      <div key={exercise.id} className="exerciseHolder">
        <div>
          <li
            className="exercisesList"
            onClick={() => this.selectExercise(exercise)}
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
          onClick={() => this.selectDate(training)}
        >
          {training.date}
        </li>
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
              {this.state.userSeries.length !== 0 ? (
                <button
                  className="addSeriesButton"
                  onClick={() =>
                    this.addNewSeriesToRepetitions(this.state.number)
                  }
                >
                  Dodaj
                </button>
              ) : (
                <p>Dodaj date i ćwiczenie</p>
              )}
            </div>
          </div>
          <div>{"Powtórzenia:" + this.state.userSeries.repetitions}</div>
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
