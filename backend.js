import request from 'request'
const ip = '34.235.94.25';
// Usage: import Backend from './backend.js'
//    getEvents() returns all events as json list
//    createEvent(latitude,longitude,name,emoji,category,startTime,description) returns event id
//    goingToEvent(eventID) returns 200 or 404 if event not found
export default class Backend {
    getEvents() {
        return request.get(ip, (error, resonse, body) => {
            if (error) {
                console.error(error);
                return error;
            }
            console.log("Got Data:", response.body);
            return body;
            if (error) {
                console.error(error);
            });
    }
    createEvent(latitude, longitude, name, emoji, category, startTime, description) {
        return request.post(ip + "/event", {
            json: {
                "lat": latitude,
                "long": longitude,
                "name": name,
                "emoji": emoji,
                "category": category,
                "time": startTime,
                "description": description
            }
        },
            function (error, response, body) {
                if (error) {
                    console.error(error);
                    return error;
                }
                if (!error && response.statusCode == 200) {
                    return body;
                }
            })
    }
    goingToEvent(eventID) {
        return request.post(ip + "/going", {
            json: {
                "id": eventID
            }
        },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                    return error;
                }
                return body;
            })
    }
}