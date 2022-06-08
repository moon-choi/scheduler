import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Error from "./Error";
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
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_REMOVE = "ERROR_REMOVE";

export default function Appointment(props) {
  //=========== STATE ========== // 

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //=========== FUNCS ========== // 

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer //this is an object.
    };
    transition(SAVING); //this is loading animation
    props.bookInterview(props.id, interview) //1 //bookInterview has to return a promise.
      .then(() => { //6 (.then is waiting for the axios promise to be resolved)
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }

  const remove = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_REMOVE, true)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />


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
      {mode === EDIT && <Form onSave={save} onCancel={back} student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} />}
      {mode === ERROR_SAVE && <Error message={ERROR_REMOVE} onClose={back} />}
      {mode === ERROR_REMOVE && <Error message={ERROR_REMOVE} onClose={back} />}

    </article>

  )
}
