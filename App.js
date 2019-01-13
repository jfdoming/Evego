import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapCmp from './MapCmp';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  
  render() {
    const data = Backend.getEvents();
    return (
      <>
        <MapCmp></MapCmp>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
