import React from "react";

export class AddSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepetitionValue: ""
    };
  }
  updateInputValue = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  getActiveSeries = (dateId, exerciseId) => {
    if (dateId == null || exerciseId == null) {
      return null;
    }

    for (let el of this.props.userSeries) {
      if (el.dateId === dateId && el.exerciseId === exerciseId) {
        return el;
      }
    }
    const series = {
      dateId,
      exerciseId,
      repetitions: []
    };
    return series;
  };

  addNewSeriesToRepetitions = amount => {
    const activeSeries = this.getActiveSeries(
      this.props.activeDate,
      this.props.activeExercise
    );
    activeSeries.repetitions.push(amount);
    this.props.addNewSeriesToRepetitions(activeSeries);
  };

  render() {
    const activeSeries = this.getActiveSeries(
      this.props.activeDate,
      this.props.activeExercise
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
    return (
      <div className="trainingContainer">
        <div className="clickedExerciseAndDateContainer">
          <span className="clickedExercise">
            {this.props.activeExercise !== null
              ? this.props.activeExercise.name
              : ""}
          </span>
          <span className="clickedDate">
            {this.props.activeDate !== null ? this.props.activeDate.date : ""}
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
    );
  }
}
