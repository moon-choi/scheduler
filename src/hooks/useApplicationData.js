/* eslint-disable no-throw-literal */
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

  const updateSpots = (state, appointments, id) => { //id is appointment id 1-5:mon, 6-10:tuesday
    const newSpots = state.days.map(day => {
      for (const appID of day.appointments) {
        if (appID === id) {

          let counter = 0;
          for (const appNum of day.appointments) {
            const foundApp = Object.values(appointments).find(x => {
              console.log(x.id, appNum)
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
    // console.log('newDAYS', newDays)
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
      // by returning axios, you are giving this back to the .then after props.bookInterview()
      //3.async //we are waiting for axios to be done.
      .then((response) => { //4
        const newDays = updateSpots(state, appointments, id);
        // updateSpots(id); //PROBLEM CODE
        setState({
          ...state,
          appointments: appointments,
          days: newDays
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

    return axios.delete(`/api/appointments/${id}`) //deleting in the database.
      .then((response) => {
        const newDays = updateSpots(state, appointments, id);
        // throw ('error'); // you have to error out before the erroneous change is refelcted in the state.

        setState({
          ...state,
          appointments: appointments,
          days: newDays
        })
      })

  }

  useEffect(() => {
    // axios.get("/api/days").then(response => setDays(response.data)); //response.data === days.
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
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
    updateSpots,
    bookInterview,
    editInterview,
    cancelInterview
  })
};