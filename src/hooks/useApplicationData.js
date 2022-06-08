/* eslint-disable no-throw-literal */
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day: day });
  const updateSpots = (state, appointments, id) => {
    const newSpots = state.days.map(day => {
      for (const appID of day.appointments) {
        if (appID === id) {

          let counter = 0;
          for (const appNum of day.appointments) {
            const foundApp = Object.values(appointments).find(x => {
              return x.id === appNum
            })

            if (foundApp.interview === null) {
              counter++;
            }
          }
          return { ...day, spots: counter };
        } // we have to finish the loop and give every day a chance
      }
      return { ...day }
    })
    if (newSpots.length === 0) {
      console.log('invalid appointment ID')
      return false;
    }
    return newSpots;
  };

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
      .then((response) => { //4
        const newDays = updateSpots(state, appointments, id);
        setState({
          ...state,
          appointments: appointments,
          days: newDays
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
      .then((response) => {
        setState({
          ...state,
          appointments: appointments
        });
        return interview
      })
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        const newDays = updateSpots(state, appointments, id);

        setState({
          ...state,
          appointments: appointments,
          days: newDays
        })
      })

  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data,
      }));
    });
  }, []); //empty array - run only once. 

  return ({
    state,
    setDay,
    updateSpots,
    bookInterview,
    editInterview,
    cancelInterview
  })
};