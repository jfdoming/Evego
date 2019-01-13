import React from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';
import { getEventDetails } from "./backend";

export default class MarkerCallout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: {}};
  }
  
  componentDidMount() {
    getEventDetails(this.props.id).then((data) => {
      this.setState({
        loading: false,
        data: data
      });
    });
  }
  
  render() {
    if (this.state.loading) {
      return (<Text>Loading...</Text>);
    }
    
    let pluralism = this.state.data.going == 1 ? "person is" : "people are";
    
    return (
      <MapView.Callout style={{width: 200}}>
        <View>
          <Text style={{fontWeight: "bold"}}>{this.state.data.name + "\n"}</Text>
          <Text>{this.state.data.description + "\n\n"}</Text>
          <Text>{`${this.state.data.going} ${pluralism} going`}</Text>
        </View>
      </MapView.Callout>
    );
  }
}