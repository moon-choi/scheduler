import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  //=========== STATE ========== // 
  const [student, setStudent] = useState(props.student || "");
  //props.student (when you edit)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //props.interviewer (when you edit)

  //=========== FUNCS ========== // 
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(student, interviewer.id); //validate calls save.. so i should use validate for everywhere that used save?
  }

  console.log('Form.js - INTERVIEWER', interviewer)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="student_name" //good practice - you will lose HTML5 default behaviour.
            type="text" //good practice - you will lose HTML5 default behaviour. (e.g. password protetction ***)
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList value={interviewer} interviewers={props.interviewers} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {
            validate();
          }}>Save</Button>
          {/* 
          //() => props.onSave(student, interviewer) // i will give a function
          // props.onSave(student, interviewer) // i am just feeding an object */}
        </section>
      </section>
    </main>

  )
}