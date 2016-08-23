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
