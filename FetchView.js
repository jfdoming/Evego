import React from 'react';
import { Text, View } from 'react-native';
import { getEvents } from './backend';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  componentDidMount() {
    return getEvents().then((jsonData) => {
      this.setState({
        isLoading: false,
        dataSource: jsonData,
      }, function () {

      });
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <Text style={{color: "red"}}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <Text>{JSON.stringify(this.state.dataSource)}</Text>
      </View>
    );
  }
}