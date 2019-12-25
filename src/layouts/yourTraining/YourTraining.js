import React from "react";
import "./YourTraining.css";
import { AddTraining } from "./components/addTraining/AddTraining";

class yourTraining extends React.Component {
  exerciseIdCounter = 3;
  dateIdCounter = 3;
  seriesCounter = 0;
  state = {
    lastAddedDate: "",
    activeDate: null,
    activeExercise: null,
    addExerciseInputValue: "",
    newRepetitionValue: "",
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

  deleteExercise = id => {
    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise.id !== id)
    });
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

  addNewSeriesToRepetitions = amount => {
    const activeSeries = this.getActiveSeries(
      this.state.activeDate,
      this.state.activeExercise
    );
    activeSeries.repetitions.push(amount);

    this.setState({
      userSeries: [
        ...this.state.userSeries.filter(
          series =>
            series.dateId !== this.state.activeDate ||
            series.exerciseId !== this.state.exerciseId
        ),
        activeSeries
      ]
    });
  };

  getActiveSeries = (dateId, exerciseId) => {
    if (dateId == null || exerciseId == null) {
      return null;
    }

    for (let el of this.state.userSeries) {
      if (el.dateId === dateId && el.exerciseId === exerciseId) {
        return el;
      }
    }
    const series = {
      dateId,
      exerciseId,
      repetitions: []
    };
    this.setState(prevState => ({
      userSeries: [...prevState.userSeries, series]
    }));
    return series;
  };

  selectDate = training => {
    this.setState({ activeDate: training });
  };

  selectExercise = exercise => {
    this.setState({ activeExercise: exercise });
  };

  render() {
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

    const activeSeries = this.getActiveSeries(
      this.state.activeDate,
      this.state.activeExercise
    );
    let sets;
    if (activeSeries !== null) {
      sets = (
        <div>
          {activeSeries.repetitions.map((set, index) => (
            <span key={index}>{set + " "}</span>
          ))}
        </div>
      );
    }

    let calendar = new Date(),
      today =
        calendar.getDate() +
        "-" +
        (calendar.getMonth() + 1) +
        "-" +
        calendar.getFullYear();

    return (
      <div className="mainContainer">
        <AddTraining
          exercises={this.state.exercises}
          selectExercise={this.selectExercise}
          addExercise={this.addExerciseToState}
          deleteExercise={this.deleteExercise}
        />
        <div className="trainingContainer">
          <div className="clickedExerciseAndDateContainer">
            <span className="clickedExercise">
              {this.state.activeExercise !== null
                ? this.state.activeExercise.text
                : ""}
            </span>
            <span className="clickedDate">
              {this.state.activeDate !== null ? this.state.activeDate.date : ""}
            </span>
          </div>
          <div>
            <div>
              {activeSeries !== null ? (
                <div className="addSeriesHolder">
                  <div>
                    <input
                      type="number"
                      name="newRepetitionValue"
                      className="seriesRepeatInput"
                      onChange={this.updateInputValue}
                    ></input>
                  </div>
                  <button
                    className="addSeriesButton"
                    onClick={() =>
                      this.addNewSeriesToRepetitions(
                        this.state.newRepetitionValue
                      )
                    }
                  >
                    Dodaj
                  </button>
                </div>
              ) : (
                <p>Dodaj date i ćwiczenie</p>
              )}
            </div>
            {sets}
          </div>
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
