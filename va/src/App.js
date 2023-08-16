import React ,{Component}from "react";
import DatePicker from "./components/DatePicker";
import CalendarEvents from "./components/CalendarEvents";
import "./App.css";

class App extends Component {
  state = {
    date: null,
  };

  handleDateChange = (date) => this.setState({ date });

  render() {
    const { date } = this.state;

    return (
      <>
        <div id="center">
          <DatePicker onChange={this.handleDateChange} />
        </div>
        <div id="center">
          <div class="contt">
            <CalendarEvents />
          </div>
        </div>
      </>
    );
  }
}
export default  App;