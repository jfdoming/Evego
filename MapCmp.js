import React from 'react';
import { Text } from 'react-native';
import { MapView } from 'expo';
Marker = MapView.Marker;
import { getEvents } from './backend';
import { Constants, Location, Permissions } from 'expo';
export default class MapCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markers: [],
      location: { lat: 0, long: 0 }
    };
  }
  parsePointData(data) {
    return {
      title: data.emoji,
      description: "",
      id: data.id,
      coordinate: {
        latitude: data.lat,
        longitude: data.long
      }
    }
  }
  componentDidMount() {
    //  this._getLocationAsync();
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
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    console.log(this.state, "waiting...")
    let location = await Location.getCurrentPositionAsync({});
    console.log("test", location)
    this.setState({ location: location });
  };
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location.lat,
          longitude: this.state.location.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={this.onRegionChange}
      >
        {this.state.markers.map((marker, index) => {
          return (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            >
              <Text style={{ fontSize: 20 }}>😉</Text>
            </Marker>
          );
        })}
      </MapView>
    );
  }
}