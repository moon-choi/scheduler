import React from "react";
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {
  const arr = props.interviewers.map((interviewer) => // mapping through 3 days in the days array in index.js
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.name === props.name}
      setInterviewer={props.setInterviewer}
    />
  )
  return (
    <ul>{arr}</ul>
  );
}