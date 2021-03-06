import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";

import {
  getAppointmentsForDay, getInterview, getInterviewersForDay
} from "helpers/selectors";

export default function Application(props) {

  const { state, setDay, bookInterview, editInterview, cancelInterview } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day) // this is an array

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const dailySchedule = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      editInterview={editInterview}
    // Then pass bookInterview to each Appointment component as props.
    />

  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day} //day={state.day}
            onChange={setDay} //setDay={.....}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailySchedule}
        <Appointment key="last" time="5pm" />
        {/* this is decorative, visual purposes */}
      </section>
    </main>
  );
};






















//========== MOCK DATA : days =========//
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

//========== MOCK DATA : appointments =========//

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };


  // const [day, setDay] = useState('Monday')
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})