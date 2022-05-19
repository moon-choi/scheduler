import React from "react";
import "./styles.scss";

export default function Appointment() {
  return (
    <>
      <header className="appointment__time">
        <h4 className="text--semi-bold">12pm</h4>
        <hr className="appointment__separator" />
      </header>
      <article className="appointment"></article>
    </>
  )
}
