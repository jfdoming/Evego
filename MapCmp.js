import React from 'react';
import { Text } from 'react-native';
import { MapView } from 'expo';
Marker = MapView.Marker;

export default class MapCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {markers: [
      {
        title: "😉",
        description: "",
        coordinate: {
          latitude: 37.78825,
          longitude: -122.4324
        }
      }
    ]};
  }
  
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={this.onRegionChange}
      >
        {this.state.markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            >
              <Text style={{fontSize: 20}}>😉</Text>
            </Marker>
          );
        })}
      </MapView>
    );
  }
}