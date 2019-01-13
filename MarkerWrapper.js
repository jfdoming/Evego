import React from 'react';
import { Text, View } from 'react-native';
import { Callout } from 'react-native-maps';
import { getEventDetails } from "./backend";
import { getTimeUntil } from "./datetime";
import CustomMarker from "./CustomMarker"
export default class MarkerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openCallout: -1 };
  }
  render() {
    return (
      <>
        {this.props.markers.map((marker) => {
          return (
            <CustomMarker
              key={marker.id}
              coordinate={marker.coordinate}
              onPress={() => {
                this.props.showInfoCard(marker.id);
              }}
            >
              <Text style={{ fontSize: 20 }}>{marker.emoji}</Text>
            </CustomMarker>
          );
        })}
      </>
    );
  }
}