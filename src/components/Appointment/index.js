import React, { useState } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    console.log('interviewer', interviewer)
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); //this is loading animation
    props.bookInterview(props.id, interview) //1 //bookInterview has to return a promise.
      .then(() => { //6 (.then is waiting for the axios promise to be resolved)
        transition(SHOW);
      })
    // return 'moon'; //for test with Ahana
  }

  const remove = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  }

  const edit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(EDIT);
    props.bookInterview(props.id, interview) //1 //bookInterview has to return a promise.
      .then(() => { //6 (.then is waiting for the axios promise to be resolved)
        transition(SHOW);
      })


  }

  console.log('props.interview', props.interview)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* Header should contain props.time value */}

      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form onSave={save} onCancel={back} interviewers={props.interviewers} />}
      {/* this is not where the functions are called. it doesn't get its arguments from here. it gets its arguments from the form component. */}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={remove} />}
      {/* {mode === EDIT && } */}

    </article>

  )
}
