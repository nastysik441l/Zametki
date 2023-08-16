import { format } from "date-fns";
import React from "react";
import styles from "./CurrentDate.css";
//вывод сегоднешнего дня
const CurrentDate = ({ currentDate }) => {
  return (
    <font size="10" color="black" className={styles.currentDate}>
      <div className={styles.number}>{format(currentDate, "d")}</div>
      <div className={styles.day}>{format(currentDate, "EEEE")}</div>
    </font>
  );
};

export default CurrentDate;
