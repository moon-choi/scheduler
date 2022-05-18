import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("li", {
    "interviewers__item": props,
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/* syntax 1 */}
      {props.selected && props.name}

      {/* syntax 2 */}
      {/* {props.selected && <>props.name</>}
      
      {/* syntax 3*/}
      {/* {props.selected && <>{props.name}</>} */}
    </li>
  );
}