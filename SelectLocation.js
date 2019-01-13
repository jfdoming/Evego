import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, StatusBar, TextInput, Picker, TouchableOpacity, Button } from 'react-native';
import { MapView } from 'expo';
export default class SelectLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: { latitude: 0, longitude: 0 },
            isLoading: true
        }
    }
}