import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Backend from './backend';
export default class App extends React.Component {
  render() {
    const data = await Backend.getEvents();
    return (
      <View style={styles.container}>
        <Text>{data}</Text>
      </View>
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
