import React, { useState } from "react";
import "./index.css";

const CalendarEvents = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventSubmit = (eventData) => {
    //создаем новое событие
    const newEvent = { ...eventData, date: selectedDate };

    // добавляем новое событие
    setEvents([...events, newEvent]);
  };

  const renderEvents = () => {
    // список событий по выбранной дате
    const filteredEvents = events.filter(
      (event) =>
        event.date.toLocaleDateString() === selectedDate.toLocaleDateString()
    );

    return (
      <ul>
        {filteredEvents.map((event, index) => (
          <li key={index}>{event.title}</li>
        ))}
      </ul>
    );
  };
  //работа с кнопками для заметок
  return (
    <div>
      <p></p>
      {selectedDate.toLocaleDateString()}
      <div>
        <button
          onClick={() =>
            handleDateChange(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                1
              )
            )
          }
        >
          {"<"}
        </button>
        <button onClick={() => handleDateChange(new Date())}>Today</button>
        <button
          onClick={() =>
            handleDateChange(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                1
              )
            )
          }
        >
          {">"}
        </button>
      </div>
      <div>
        <EventForm onSubmit={handleEventSubmit} />
      </div>
      <div>{renderEvents()}</div>
    </div>
  );
};

const EventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, time });
    setTitle("");
    setTime("");
  };
  //вывод результата
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={title}
          placeholder="Enter new event"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button className="Add" type="submit">
        Add
      </button>
    </form>
  );
};

export default CalendarEvents;
