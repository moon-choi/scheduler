//=========== GET APPOINTMENTS ===========//


export function getAppointmentsForDay(state, day) {

  //--------- solution 1. Find & Filter ---------//

  const thisDay = state.days.find(x => x.name === day)
  if (!thisDay) {
    return []; // to pass last 2 tests.
  }
  // 주어진 데이에 해당하는 걸 뽑아냄. just 'tuesday' object.
  const thisDayApps = thisDay.appointments;// tuesday 의 app [4,5]
  const appDetails = Object.values(state.appointments) // [ { id: 1,  time: ..}, { id: 2, time:  ..}, {id: 4..}, {id:5..} ]
  const finalApp = appDetails.filter(item => thisDayApps.includes(item.id))
  //[ {id: 4}, {id: 5} ]
  //--------- solution 2. Map ---------//

  const myApp = thisDayApps.map(item => state.appointments[item])
  //  return myaPP
  //---------solution 3. For loop ---------//

  const results = [];
  for (const x of thisDayApps) {
    results.push(state.appointments[x]);
  }

  return results
}

//=========== GET INTERVIEWS ===========//

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  console.log(state.student)
  console.log(state.appointments.interview)
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return result
}


