const ip = 'http://34.235.94.25:80';
const goingEvents = [];
// Usage: import Backend from './backend.js'
//    getEvents() returns all events as json list
//    createEvent(latitude,longitude,name,emoji,category,startTime,description) returns event id
//    goingToEvent(eventID) returns 200 or 404 if event not found
export function getEvents() {
    return fetch(ip).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
}

export function getEventDetails(eventID) {
    return fetch(ip + "/info", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": eventID
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
}

export function createEvent(latitude, longitude, name, emoji, category, startTime, description) {
    return fetch(ip + "/event", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": latitude,
            "long": longitude,
            "name": name,
            "emoji": emoji,
            "category": category,
            "time": startTime,
            "description": description
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
}

export function goingToEvent(eventID) {
    goingEvents.push(eventID);
    return fetch(ip + "/going", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": eventID
        })
    }).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.error(error);
    });
}
export function isGoing(eventID) {
    return goingEvents.indexOf(eventID) !== -1;
}
export function notGoingToEvent(eventID) {
    var index = goingEvents.indexOf(eventID);
    if (index !== -1) goingEvents.splice(index, 1);
    return fetch(ip + "/notgoing", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": eventID
        })
    }).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.error(error);
    });
}

