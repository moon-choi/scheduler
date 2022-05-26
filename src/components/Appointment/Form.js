import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  //props.student (when you edit)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //props.interviewer (when you edit)
  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

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

        <InterviewerList value={interviewer} interviewers={props.interviewers} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
          {/* 
          //() => props.onSave(student, interviewer) // i will give a function
          // props.onSave(student, interviewer) // i am just feeding an object */}
        </section>
      </section>
    </main>

  )
}