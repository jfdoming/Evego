import React from 'react';
import { Text, View } from 'react-native';
import { Callout } from 'react-native-maps';
import { getEventDetails } from "./backend";
import { getTimeUntil } from "./datetime";
import { Marker } from 'react-native-maps';
export default class CustomMarker extends Marker {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.coordinate.latitude != this.state.coordinate.latitude && nextProps.coordinate.longitude != this.state.coordinate.longitude;
    }
}