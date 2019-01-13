import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, StatusBar, TextInput, Picker, TouchableOpacity, Button, TimePickerAndroid } from 'react-native';
import TopBar from './TopBar'
import EmojiSelector from 'react-native-emoji-selector'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';
import { createEvent } from './backend';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getDateString } from "./datetime";

export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "2:30",
            title: "",
            description: "",
            emojiTime: false,
            category: "category",
            emoji: "⚽",
            chooseLocation: false
        }
    }
    static navigationOptions = {
        headerTitle: 'Make an Event',
    };
    componentDidMount() {
        this.getLocationAsync();
    }
    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                location: { latitude: 20, longitude: -40 },
                loaded: true
            });
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location.coords, loaded: true });
    };
    render() {
        if (this.state.emojiTime) {
            return (<View renderToHardwareTextureAndroid={true}>
                <EmojiSelector
                    style={styles.emojiSelector}
                    onEmojiSelected={emoji => this.setState({ emojiTime: false, emoji: emoji })}
                />
            </View>);
        }
        if (this.state.chooseLocation) {
            return (<MapView style={{ height: '100%', width: '100%' }}
                onPress={(coordinate) => {
                    this.setState({
                        chooseLocation: false,
                        position: coordinate.nativeEvent.coordinate
                    })
                }}
                region={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />)
        }
        return (
            <View>
                <TextInput
                    style={{
                        marginTop: 25,
                        height: 50,
                        paddingLeft: 6,
                    }}
                    value={this.state.title}
                    selectionColor="#428AF8"
                    underlineColorAndroid="#428AF8"
                    placeholder="Title of Event"
                    onChangeText={(title) => this.setState({ title })}
                />

                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.category}
                        style={{ width: 200 }}
                        value={this.state.category}
                        onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                        <Picker.Item label="Category" value="category" />
                        <Picker.Item label="Sports" value="sports" />
                        <Picker.Item label="Technology" value="tech" />
                    </Picker>
                    <View style={styles.button}>
                        <Button
                            color="#841584"
                            title={"Emoji: " + this.state.emoji}
                            onPress={() => { this.setState({ emojiTime: true }) }}>
                            <Text></Text>
                        </Button>
                    </View>
                </View>
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                    borderTopColor: '#000000',
                    borderTopWidth: 1,
                    marginTop: 20
                }}
                >
                    <TextInput
                        style={{
                            marginTop: 50,
                            height: 50,
                            paddingLeft: 6,
                        }}
                        value={this.state.description}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Description of event..."
                        onChangeText={(description) => this.setState({ description })}
                    />
                </View>
                <View style={{ marginTop: 25, marginLeft: 50, marginRight: 50 }}>
                    <Button

                        onPress={() => {
                            TimePickerAndroid.open({
                                hour: 14,
                                minute: 0,
                                is24Hour: false, // Will display '2 PM'
                            }).then((payload) => {
                              if (payload.action == TimePickerAndroid.dismissedAction) {
                                return;
                              }
                              let date = new Date();
                              date.setHours(payload.hour);
                              date.setMinutes(payload.minute);
                              this.setState({ time: getDateString(date) });
                            })
                        }}
                        title="Pick Time"
                        color="#841584"
                    />
                </View>
                <View style={{ marginTop: 25, marginLeft: 50, marginRight: 50 }}>
                    <Button

                        onPress={() => { this.setState({ chooseLocation: true }) }}
                        title="Choose location"
                        color="#841584"
                    />
                </View>
                <View style={{ marginTop: 50, marginLeft: 50, marginRight: 50 }}>
                    <Button
                        onPress={() => { this.create() }}
                        title="Create!"
                        color="#841584"
                    />
                </View>
            </View >
        )
    }
    async create() {
      if (!this.state.position) {
        ToastAndroid.show('Please choose a location', ToastAndroid.SHORT);
        return;
      }
      
      await createEvent(this.state.position.latitude, this.state.position.longitude, this.state.title, this.state.emoji, this.state.category, this.state.time, this.state.description);
      this.props.navigation.navigate('Map', { refresh: true })
    }
}
const styles = StyleSheet.create({
    emojiSelector: {
        marginTop: 20,
        height: '100%'
    },
    container: {
        marginTop: 25,
        //   flex: 1,
        flexDirection: 'row',
    },
    emoji: {
        marginLeft: 40,
        marginRight: 10
    },
    button: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding: 10,
        marginLeft: 35,
        marginRight: 10,
        width: 150,
        height: 50
    },
});