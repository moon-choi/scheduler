export function getAppointmentsForDay(state, day) {

  const thisDay = state.days.find(oneDay =>
    oneDay.name === day) // 주어진 데이에 해당하는 걸 뽑아냄. just a day. 

  const appsArr = thisDay.appointments;// 해당 데이의 app arr. [4,5]

  //======== solution 1. Filter =========//
  const apps = Object.values(state.appointments)
  // [ 
  // { id: 1, time: "12pm", interview: null }, 
  // { id: 2, time: "1pm", interview: null },
  // ]  
  // each app's details in array
  const thisDayApp = apps.filter(item => appsArr.includes(item.id))

  //======== solution 2. For loop ========//
  const results = [];
  for (const x of appsArr) {
    results.push(state.appointments[x]);
  }
  console.log('RESULTS', results)

  //========= solution 3. Map =========//
  // const thisDayAppointment = .map(item => item.id)
  console.log('thisdayapp', thisDayApp)
  return thisDayApp
}


// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

/* TO BE DELETED
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};
*/