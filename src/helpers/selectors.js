//=========== GET APPOINTMENTS ===========//

export function getAppointmentsForDay(state, day) {

  //--------- solution 1. Find & Filter ---------//

  const thisDay = state.days.find(x => x.name === day)
  if (!thisDay) {
    return []; // to pass last 2 tests.
  }
  const thisDayApps = thisDay.appointments;// tuesday 의 app [4,5]
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

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return result
}

//=========== GET INTERVIEWERS ===========//

export function getInterviewersForDay(state, day) {
  const thisDay = state.days.find(x => x.name === day)
  if (!thisDay) {
    return [];
  }

  const thisDayInts = thisDay.interviewers;
  const intDetails = Object.values(state.interviewers)
  const finalIntDetails = intDetails.filter(x => thisDayInts.includes(x.id)) //filter returns an array
  return finalIntDetails
}

