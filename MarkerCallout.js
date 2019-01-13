import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Callout } from 'react-native-maps';
import { getEventDetails } from "./backend";
import { getTimeUntil } from "./datetime";
import { goingToEvent, isGoing, notGoingToEvent } from "./backend"
export default class MarkerCallout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, data: {}, lastId: -1 };
  }
  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    } else if (this.props.id != this.state.lastId) {
      this.state.loading = true;
      this.state.lastId = this.props.id;
      getEventDetails(this.props.id).then((data) => {
        this.setState({
          loading: false,
          data: data
        });
      });
      return <Text>Loading...</Text>;
    }

    let pluralism = this.state.data.going == 1 ? "person is" : "people are";

    return (
      <>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>{this.state.data.name + "\n"}</Text>
        <Text>{this.state.data.description + "\n\n"}</Text>
        <Text>{`${this.state.data.going} ${pluralism} going`}</Text>
        <Text>{`Starts at ${this.state.data.time}`}</Text>
        <TouchableOpacity style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DDDDDD',
          position: 'absolute',
          right: 20,
          top: 20,
          padding: 10,
          width: 100,
          height: 100,
          borderRadius: 20
        }}
          onPress={() => {
            if (!isGoing(this.state.data.id)) {
              goingToEvent(this.state.data.id);
              this.state.data.going++;
            } else {
              notGoingToEvent(this.state.data.id);
              this.state.data.going--;
            }
            this.setState({ going: isGoing(this.state.data.id) })
          }}>
          <Text>{this.state.going ? "I'm not going" : "I'm Going!"}</Text>
        </TouchableOpacity>
        <Text style={{ borderRadius: 10, backgroundColor: "grey", color: "white", width: "auto", padding: 5, textAlign: "center" }}>{this.state.data.category}</Text>
      </>
    );
  }
}