import React from 'react';
import { StyleSheet, Text, View, Button, Alert, StatusBar, TouchableWithoutFeedback } from 'react-native';
import MapCmp from './MapCmp';
import { getEvents } from './backend';
import InfoCard from "./InfoCard";
import CreateEvent from './CreateEvent'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import ActionButton from 'react-native-action-button';
import SelectLocation from './SelectLocation';
import { Ionicons } from '@expo/vector-icons';
export class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, infoId: -1, forceUpdate: false }
  }

  ud() {
    console.log("wtf")
    this.setState({ forceUpdate: !this.state.forceUpdate })
  }
  showInfoCard = (id) => {
    this.setState({ infoId: id })
  }
  componentDidUpdate() {
    //   if (this.props.navigation.state.params.refresh) {
    //    console.log("force updating lmao")
    //   this.ud();
    //   this.props.navigation.state.params.refresh = false;
    // }
  }
  render() {
    return (
      <View style={{ display: "flex", flexFlow: "column", height: "100%" }}>
        <StatusBar hidden />
        <View style={{ position: "relative", flexGrow: 1, flexShrink: 1, flexBasis: "auto", zIndex: -1 }}>
          <MapCmp showInfoCard={this.showInfoCard}></MapCmp>
          <TouchableWithoutFeedback
            onPress={() => { this.ud() }}
          >
            <Ionicons style={{ position: 'absolute', top: 10, right: 10 }} name="md-refresh" size={32} color="grey" />
          </TouchableWithoutFeedback>
          <InfoCard id={this.state.infoId} />
        </View>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.props.navigation.navigate('Event')}
        />


      </View>
    );
  }
}

const HomeScreen = createStackNavigator({ Map: { screen: MapScreen, navigationOptions: () => ({ header: null }) }, Event: CreateEvent, SelectLocation: SelectLocation })

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
          onPress={() => this.props.navigation.navigate('NewScreen')}
        />
      </View>
    );
  }
}

class NewScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="New Screen"
          onPress={() => this.props.navigation.navigate('Preferences')}
        />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  'List View': ListScreen,
  Home: HomeScreen,
  Preferences: DetailsScreen
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home'
        }
        else if (routeName === 'Preferences') {
          iconName = 'md-settings'
        }
        else {
          iconName = 'md-list'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  });


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

