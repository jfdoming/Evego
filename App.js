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
          buttonColor="rgba(69,69,69,0.8)"
          onPress={() => this.props.navigation.navigate('Event')}
          hideShadow={false}
        />


      </View>
    );
  }
}

const HomeScreen = createStackNavigator({ Map: { screen: MapScreen, navigationOptions: () => ({ header: null }) }, Event: CreateEvent, SelectLocation: SelectLocation })

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor1: 'black',
      buttonColor2: 'black',
      buttonColor3: 'black',
      buttonColor4: 'black',
      buttonColor5: 'black',
      buttonColor6: 'black',
      buttonColor7: 'black',
      buttonColor8: 'black',
      buttonColor9: 'black',
      buttonColor10: 'black',
      buttonColor11: 'black',
      buttonColor12: 'black',
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginTop: 10, fontSize: 25, marginBottom: 10 }}>Preferences</Text>
        <Button
          title="Films"
          color={this.state.buttonColor1}
          onPress={() => {
            this.setState({ buttonColor1: '#F5D21D' });
          }}
        />
        <Button
          title="Novels"
          color={this.state.buttonColor2}
          onPress={() => {
            this.setState({ buttonColor2: '#F5D21D' });
          }}
        />
        <Button
          title="Astronomy"
          color={this.state.buttonColor3}
          onPress={() => {
            this.setState({ buttonColor3: '#F5D21D' });
          }}
        />
        <Button
          title="Video Games"
          color={this.state.buttonColor4}
          onPress={() => {
            this.setState({ buttonColor4: '#F5D21D' });
          }}
        />
        <Button
          title="Environment"
          color={this.state.buttonColor5}
          onPress={() => {
            this.setState({ buttonColor5: '#F5D21D' });
          }}
        />
        <Button
          title="Meetup"
          color={this.state.buttonColor6}
          onPress={() => {
            this.setState({ buttonColor6: '#F5D21D' });
          }}
        />
        <Button
          title="Tech"
          color={this.state.buttonColor7}
          onPress={() => {
            this.setState({ buttonColor7: '#F5D21D' });
          }}
        />
        <Button
          title="Business"
          color={this.state.buttonColor8}
          onPress={() => {
            this.setState({ buttonColor8: '#F5D21D' });
          }}
        />
        <Button
          title="Arts"
          color={this.state.buttonColor9}
          onPress={() => {
            this.setState({ buttonColor9: '#F5D21D' });
          }}
        />
        <Button
          title="Sports"
          color={this.state.buttonColor10}
          onPress={() => {
            this.setState({ buttonColor10: '#F5D21D' });
          }}
        />
        <Button
          title="Food"
          color={this.state.buttonColor11}
          onPress={() => {
            this.setState({ buttonColor11: '#F5D21D' });
          }}
        />
        <Button
          title="Science"
          color={this.state.buttonColor12}
          onPress={() => {
            this.setState({ buttonColor12: '#F5D21D' });
          }}
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
      activeTintColor: '#F5D21D',
      inactiveTintColor: '#AAAAAA',
      inactiveBackgroundColor: '#000000',
      activeBackgroundColor: '#000000'
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
