import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {
  return (
    <>
      <Header />
      <article className="appointment"></article>
      {props.interview ? <Empty /> : <Show />}
      {/* it's JS */}
    </>
  )
}
