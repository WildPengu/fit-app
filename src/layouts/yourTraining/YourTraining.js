import React from "react";
import "./YourTraining.css";
import { AddExercise } from "./components/addExercise/AddExercise";
import { AddTrainingDay } from "./components/addTrainingDay/AddTrainingDay";
import { AddSeries } from "./components/addSeries/AddSeries";
import { ShowTrainingDays } from "./components/showTrainingDays/ShowTrainingDays";

class yourTraining extends React.Component {
  exerciseIdCounter = 3;
  state = {
    activeDate: null,
    activeExercise: null,
    exercises: [
      {
        id: 0,
        name: "Bench press",
      },
      {
        id: 1,
        name: "Pushups",
      },
      {
        id: 2,
        name: "Squats",
      },
    ],
    trainingDays: [
      {
        id: 0,
        date: "05-12-2019",
      },
      {
        id: 1,
        date: "06-12-2019",
      },
      {
        id: 2,
        date: "08-12-2019",
      },
    ],
    userSeries: [],
  };

  addExerciseToState = (exercise) => {
    this.setState({
      exercises: [...this.state.exercises, exercise],
    });
  };

  deleteExercise = (id) => {
    this.setState({
      exercises: this.state.exercises.filter((exercise) => exercise.id !== id),
    });
  };

  addTrainingDay = (date) => {
    this.setState({
      trainingDays: [...this.state.trainingDays, date],
    });
  };

  addNewSeriesToRepetitions = (activeSeries) => {
    this.setState({
      userSeries: [
        ...this.state.userSeries.filter(
          (series) =>
            series.dateId !== this.state.activeDate ||
            series.exerciseId !== this.state.exerciseId
        ),
        activeSeries,
      ],
    });
  };

  selectDate = (training) => {
    this.setState({ activeDate: training });
  };

  selectExercise = (exercise) => {
    this.setState({ activeExercise: exercise });
  };

  render() {
    return (
      <>
        <div className="mainContainer">
          <AddExercise
            exercises={this.state.exercises}
            selectExercise={this.selectExercise}
            addExercise={this.addExerciseToState}
            deleteExercise={this.deleteExercise}
          />
          <AddSeries
            userSeries={this.state.userSeries}
            activeDate={this.state.activeDate}
            activeExercise={this.state.activeExercise}
            getActiveSeries={this.getActiveSeries}
            addNewSeriesToRepetitions={this.addNewSeriesToRepetitions}
          />
          <AddTrainingDay
            addTrainingDay={this.addTrainingDay}
            trainingDays={this.state.trainingDays}
            selectDate={this.selectDate}
          />
        </div>
      </>
    );
  }
}

export default yourTraining;
