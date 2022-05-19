import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // const [student, setStudent] = useState(null);
  // const [interviewer, setInterviewer] = useState('');

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          // value={student}
          // onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
        /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger /* your code goes here */>Cancel</Button>
          <Button confirm /* your code goes here */>Save</Button>
        </section>
      </section>
    </main>

  )
}

<>
  <form>
    <input value={student} onChange={(event) => setStudent(event.target.value)} ></input>
    <button className="interview-button" onClick={onSave}> </button>
  </form>

  <InterviewerList></InterviewerList>
</>


// setInterviewer = {() => props.onChange(interviewer.id)}