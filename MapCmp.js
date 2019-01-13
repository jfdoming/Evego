import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { MapView } from 'expo';
Marker = MapView.Marker;
import { getEvents } from './backend';
import CreateEvent from './CreateEvent';
import { Constants, Location, Permissions } from 'expo';
import MarkerCallout from "./MarkerCallout";

import { Ionicons } from '@expo/vector-icons';
import FloatingActionButton from 'react-native-floating-action-button';
const actions = [{
  text: 'Create Event',
  icon: require('./images/add.png'),
  name: 'bt_accessibility',
  position: 2
}];

export default class MapCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markers: [],
      location: { latitude: 0, longitude: 0 },
      loaded: false
    };
  }

  onRegionChange = (region) => {
    this.setState({ location: region });
  }

  parsePointData(data) {
    return {
      emoji: data.emoji,
      title: "",
      description: "",
      id: data.id,
      coordinate: {
        latitude: data["lat"],
        longitude: data["long"]
      }
    }
  }
  componentDidMount() {
    this.getLocationAsync();
    return getEvents().then((jsonData) => {
      this.setState({
        isLoading: false,
        markers: jsonData.map(obj => {
          console.log(this.parsePointData(obj))
          return this.parsePointData(obj);
        })
      }, function () {

      });
    })
  }
  
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        location: { latitude: 20, longitude: -40 },
        loaded: true
      });
      return;
    }
    
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location.coords, loaded: true });
  };
  
  render() {
    if (!this.state.loaded) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size={200} color="#0000ff" />
        </View>
      );
    }
    console.log("render:", this.state.location)
    return (
      <>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.markers.map((marker, index) => {
            return (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
              >
                <Text style={{ fontSize: 20 }}>{marker.emoji}</Text>
                <MarkerCallout id={marker.id}/>
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.actions}>
          <FloatingActionButton style={{ position: 'absolute' }}
            iconName="plus"
            iconType="feather"
            iconColor="white"
            backgroundColor="#C3C3C3"
            textDisable
            onPress={() => {
              console.log("onPress :O");
            }}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  actions: {
    position: 'absolute',
    bottom: 85,
    right: 30,
    zIndex: 10,
  }
});