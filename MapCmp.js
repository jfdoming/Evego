import React from 'react';
import { Text } from 'react-native';
import { MapView } from 'expo';
Marker = MapView.Marker;
import { getEvents } from './backend';
import { Constants, Location, Permissions } from 'expo';
import MarkerCallout from "./MarkerCallout";

export default class MapCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markers: [],
      location: { latitude: 0, longitude: 0 }
    };
  }
  
  onRegionChange = (region) => {
    this.setState({location: region});
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
        errorMessage: 'Permission to access location was denied',
      });
    }
    
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location.coords });
  };
  
  render() {
    return (
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
    );
  }
}