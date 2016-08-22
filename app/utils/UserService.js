export function getAllCalendarsForUserId(userId) {
    return fetch(`http://localhost:3000/users/${userId}/calendars`)
        .then(response => response.json());
}

export function updateCalendar(userId, calendarId, calendar) {
    return fetch(`http://localhost:3000/users/${userId}/calendars/${calendarId}`, {
        method: "POST",
        body: JSON.stringify(calendar),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(response => response.json());
}

// export function getCalendarMaps(calendars, courses) {
//     const calendarMaps = {};
//
//     for (let calendarId in calendars) {
//         if (calendars.hasOwnProperty(calendarId)) {
//             const calendarMap = {};
//
//             calendars[calendarId].courseIds.forEach(courseId => {
//                 const course = courses[courseId];
//
//                 course.timeIndex.forEach(timeIndex => {
//                     if (!calendarMap[timeIndex]) {
//                         calendarMap[timeIndex] = {};
//                     }
//                     course.dayIndex.forEach(dayIndex => {
//                         calendarMap[timeIndex][dayIndex] = course;
//                     });
//                 });
//
//                 calendarMaps[calendarId] = calendarMap;
//             });
//         }
//     }
//
//     console.log(calendarMaps);
//
//     return calendarMaps;
// }
