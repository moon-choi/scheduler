import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

/*
solution 1. 
const formatSpots = (spots) => {
  if (spots === 0) {
    return <>no spots remaining</>
  } else if (spots === 1) {
    return <>1 spot remaining</>
  } else {
    return <>{spots} spots remaining</>
  }
}
*/

// solution 2. short circuiting with Jordan

export default function DayListItem(props) {

  const dayClass = classNames("li", {
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {props.spots === 0 && <>no spots remaining</>}
        {props.spots === 1 && <>1 spot remaining</>}
        {props.spots > 1 && <> {props.spots} spots remaining</>}
      </h3>
    </li>
  );
}