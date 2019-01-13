const ip = 'http://34.235.94.25:80';

// Usage: import Backend from './backend.js'
//    getEvents() returns all events as json list
//    createEvent(latitude,longitude,name,emoji,category,startTime,description) returns event id
//    goingToEvent(eventID) returns 200 or 404 if event not found
export function getEvents() {
    return fetch(ip).then((response) => response.json())
        .then((responseJson) => {
            console.log("RESPONSE", responseJson)
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
            console.log("RESPONSE", responseJson)
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
    return fetch(ip + "/going", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: {
            "id": eventID
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
}
