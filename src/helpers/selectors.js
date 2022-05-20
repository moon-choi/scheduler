export function getAppointmentsForDay(state, day) {

  //======== solution 1. Find & Filter =========//

  const tuesday = state.days.find(x => x.name === day)

  // if (state.days.length < 1) {
  //   return []
  // }

  if (!tuesday) {
    return []; // to pass last 2 tests.
  }

  // 주어진 데이에 해당하는 걸 뽑아냄. just 'tuesday' object.
  const tuesdayApps = tuesday.appointments;// tuesday 의 app [4,5]
  const appDetails = Object.values(state.appointments) // [ { id: 1,  time: ..}, { id: 2, time:  ..}, {id: 4..}, {id:5..} ]
  const finalApp = appDetails.filter(item => tuesdayApps.includes(item.id))
  //[ {id: 4}, {id: 5} ]

  //========= solution 2. Map =========//

  const myApp = tuesdayApps.map(item => state.appointments[item])
  console.log('myApp', myApp)

  //======== solution 3. For loop ========//

  const results = [];
  for (const x of tuesdayApps) {
    results.push(state.appointments[x]);
  }

  return finalApp
}
