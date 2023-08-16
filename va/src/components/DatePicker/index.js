import React, { Component } from "react";
import classnames from "classnames";
import CurrentDate from "../CurrentDate";
import * as calendar from "./calendar";
import "./index.css";

class DatePicker extends Component {
  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };
  //вывод года,дня,месяца
  get year() {
    return this.state.date.getFullYear();
  }

  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }
  //кнопка влево
  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1);

    this.setState({ date });
  };
  //кнопка вправо
  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);

    this.setState({ date });
  };
  //вывеска месяцев
  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;

    const date = new Date(year, month);

    this.setState({ date });
  };
  //вывеска дат
  handleDayClick = (date) => {
    this.setState({ selectedDate: date });

    this.props.onChange(date);
  };

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const { currentDate, selectedDate } = this.state;

    const monthData = calendar.getMonthData(this.year, this.month);

    return (
      <div className="calendar">
        <div className="reight">
          <CurrentDate currentDate={currentDate} />
        </div>
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>{"<"}</button>

          <select
            ref={(element) => (this.monthSelect = element)}
            value={this.month}
            onChange={this.handleSelectChange}
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>

          <select
            ref={(element) => (this.yearSelect = element)}
            value={this.year}
            onChange={this.handleSelectChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={this.handleNextMonthButtonClick}>{">"}</button>
        </header>
        <table>
          <thead>
            <tr>
              {weekDayNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} className="week">
                {week.map((date, index) =>
                  date ? (
                    <td
                      key={index}
                      className={classnames("day", {
                        today: calendar.areEqual(date, currentDate),
                        selected: calendar.areEqual(date, selectedDate),
                      })}
                      onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index} />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
    );
  }
}
//с помощью его выводится на экран  календарь
DatePicker.defaultProps = {
  date: new Date(),
  years: [
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
    2029, 2030,
  ],
  monthNames: [
    "January ",
    "February ",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  weekDayNames: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"],
};
export default DatePicker;
