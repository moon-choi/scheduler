import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const arr = props.days.map((day) => // mapping through 3 days in the days array in index.js
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value} //day.name: left side in storybook.
      setDay={() => props.onChange(day.name)} // callback fn is to run it later.
    />
  )
  return (
    <ul>{arr}</ul>
  );
}