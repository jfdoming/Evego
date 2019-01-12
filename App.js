import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapCmp from './MapCmp';
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

      });;
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style="[{flex: 1, padding: 20}]>">
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <>
        <MapCmp></MapCmp>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Text>{JSON.stringify(this.state.dataSource)}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
