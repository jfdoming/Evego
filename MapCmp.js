import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Callout } from 'react-native-maps';
import { MapView } from 'expo';
Marker = MapView.Marker;
import { getEvents, notificationStream } from './backend';
import CreateEvent from './CreateEvent';
//import { Exponent } from 'expo';
import { Constants, Location, Permissions } from 'expo';
import MarkerCallout from "./MarkerCallout";
import MarkerWrapper from "./MarkerWrapper";

import { Ionicons } from '@expo/vector-icons';
import FloatingActionButton from 'react-native-floating-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


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
      location: { latitude: 44.05724341765843, longitude: -78.1502691283822 },
      loaded: false,
      add: false
    };

    notificationStream((event) => {
      if (this.state.status === 'granted') {
        console.log("new event:", event);
        Expo.Notifications.presentLocalNotificationAsync({title: event.name || "[no title]", body: event.description || "[no description]"});
      } else {
        console.log('no perms for notification')
      }
      this.setState((prevState) => { markers: [...prevState.markers, this.parsePointData(event)] });
    });
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
  loadMarkers = () => {
    return getEvents().then((jsonData) => {
      this.setState({
        isLoading: false,
        markers: jsonData.map(obj => {
          return this.parsePointData(obj);
        })
      }, function () {

      });
    });
  }
  componentDidMount() {
    this.getLocationAsync();
    this.getNotificationsAsync();
    return this.loadMarkers();
  }
  getNotificationsAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
       console.log("got notification perms:" + status)
       this.setState({ status: status });
  }
  getLocationAsync = async () => {
    console.log("getting location")
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted') {
      this.setState({
        location: { latitude: 20, longitude: -40 },
        loaded: true
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ location: location.coords, loaded: true });
  };

  render() {
    if (this.props.reload) {
      this.state.isLoading = true;
      this.state.markers = [];
      this.loadMarkers();
    }
    console.log("hi")
    if (!this.state.loaded) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size={200} color="#0000ff" />
        </View>
      );
    }
    if (this.state.add) {
      return (<CreateEvent callback={() => {
        this.setState({ add: false })
      }} />);
    }
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
          onPress={() => this.props.showInfoCard(-1)}
        >
          <MarkerWrapper showInfoCard={this.props.showInfoCard} markers={this.state.markers} />
        </MapView>
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