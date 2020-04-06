import React from "react";

export class AddTrainingDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dateIdCounter = 3;

  formatTimeUnit = (time) => (time < 10 ? "0" + time : time);

  addTrainingDay = () => {
    let calendar = new Date(),
      today =
        this.formatTimeUnit(calendar.getDate()) +
        "-" +
        this.formatTimeUnit(calendar.getMonth() + 1) +
        "-" +
        calendar.getFullYear();

    const date = {
      id: this.dateIdCounter,
      date: today,
    };
    this.dateIdCounter++;
    this.props.addTrainingDay(date);
  };

  render() {
    const allDates = this.props.trainingDays.map((training) => (
      <div key={training.date}>
        <li
          className="trainingDateList"
          onClick={() => this.props.selectDate(training)}
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

    const shouldShowAddButton = !this.props.trainingDays.filter(
      (trainingDay) => trainingDay.date === today
    )[0];

    return (
      <div className="calendarContainer">
        <div>
          {shouldShowAddButton ? (
            <button
              onClick={() => this.addTrainingDay()}
              className="dateButton"
            >
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
    );
  }
}
