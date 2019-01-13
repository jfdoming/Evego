import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import MapCmp from './MapCmp';
import { getEvents } from './backend';
import { createBottomTabNavigator, createAppContainer} from "react-navigation";

export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  
  render() {
    return (
      <>
        <MapCmp></MapCmp>
	<Button
 	 onPress={() => {
	    Alert.alert('You tapped the button!');
	  }}
 	 title="Press Me ya"
	/>
      </>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('List View')}
        />
      </View>
    );
  }
}

class ListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="I'm at List"
          onPress={() => this.props.navigation.navigate('Preferences')}
        />
      </View>
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  'List View': ListScreen,
  Home: HomeScreen,
  Preferences: DetailsScreen,
},{
    initialRouteName: 'Home'});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

