import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const arr = props.interviewers.map((interviewer) => // mapping through 5 interviewers in the Interviewers array in index.js

    <InterviewerListItem
      // index.js: Interviewers array -> each interviewer object has id, name, avatar keys.
      key={interviewer.id}
      // id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      // selected={interviewer.id === props.interviewer}
      // //props: interviewer, interviewers
      // setInterviewer={() => props.setInterviewer(interviewer.id)}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)
      }
    />
  )


  return (
    <section className="interviewerListClass">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{arr}</ul>
    </section>);
}

// <InterviewerList> receives three props:

//   interviewers:array - an array of objects as seen above
//   setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
//     interviewer:number - a number that represents the id of the currently selected interviewer
