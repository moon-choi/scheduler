import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({ //useState comes from react.
    day: "Monday", //initial vaue
    days: [], // in the beginning empty array, useEffect runs when app first loads. 
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day: day }); //setState: part of useState.
  // const setDays = days => setState(prev => ({ ...prev, days })); //...prev: useState object. { } // copy over the whole object but only replace the days key.
  // bug proof.
  // old state still thinks the day is monday even if you change to tuesday...

  const bookInterview = (id, interview) => { //2

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      // by returning axios, you are giving this back to the .then after props.bookInterview()
      //3.async //we are waiting for axios to be done.
      .then((response) => { //4
        setState({
          ...state,
          appointments: appointments
          // or just appointments only with destructuring
        });
        return interview //5
      })
  }

  const editInterview = (id, interview) => { //2
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      // by returning axios, you are giving this back to the .then after props.bookInterview()
      //3.async //we are waiting for axios to be done.
      .then((response) => { //4
        setState({
          ...state,
          appointments: appointments
          // or just appointments only with destructuring
        });
        return interview //5
      })
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null //wiping out the interview value object and  reset to null. 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment //updating the whole appointment data.
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({
          ...state,
          appointments: appointments
        })
      })

  }

  useEffect(() => {
    // axios.get("/api/days").then(response => setDays(response.data)); //response.data === days.
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      // console.log('all', all)
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data,
      }));
    });
  }, []); //empty array - run only once. 

  return ({
    state,
    setDay,
    bookInterview,
    editInterview,
    cancelInterview
  });
};