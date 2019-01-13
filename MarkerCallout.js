import React from 'react';
import { Text, View } from 'react-native';
import { Callout } from 'react-native-maps';
import { getEventDetails } from "./backend";
import { getTimeUntil } from "./datetime";

export default class MarkerCallout extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {loading: true, data: {}};
  }
  
  componentDidMount() {
    /*getEventDetails(this.props.id).then((data) => {
      this.setState({
        loading: false,
        data: data
      });
    });*/
  }
  
  render() {
    //if (this.state.loading) {
      console.log("render marker callout load");
      return (<Callout style={{width: 200}}><Text>Loading...</Text></Callout>);
    //}
    /*console.log("render marker callout");
    
    let pluralism = this.state.data.going == 1 ? "person is" : "people are";
    
    return (
      <Callout style={{width: 200}}>
        <Text style={{fontWeight: "bold"}}>{this.state.data.name + "\n"}</Text>
        <Text>{this.state.data.description + "\n\n"}</Text>
        <Text>{`${this.state.data.going} ${pluralism} going`}</Text>
        <Text>{getTimeUntil(new Date(this.state.data.time))}</Text>
      </Callout>
    );*/
  }
}