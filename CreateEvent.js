import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, StatusBar, TextInput, Picker, TouchableOpacity, Button } from 'react-native';
import TopBar from './TopBar'
import EmojiSelector from 'react-native-emoji-selector'
import DatePicker from 'react-native-datepicker'
export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "2016-05-15",
            emojiTime: false,
            emoji: "⚽"
        }
    }
    static navigationOptions = {
        headerTitle: 'Make an Event',
    };
    render() {
        if (this.state.emojiTime) {
            return (<View>
                <EmojiSelector style={styles.emojiSelector}
                    onEmojiSelected={emoji => this.setState({ emojiTime: false, emoji: emoji })}
                />
            </View>);
        }
        return (
            <View>
                <TextInput
                    style={{
                        marginTop: 25,
                        height: 50,
                        paddingLeft: 6,
                    }}
                    selectionColor="#428AF8"
                    underlineColorAndroid="#428AF8"
                    placeholder="Title of Event"
                    onChangeText={(title) => this.setState({ title })}
                />

                <View style={styles.container}>
                    <Picker
                        selectedValue={"category"}
                        style={{ width: 200 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                        <Picker.Item label="Category" value="category" />
                        <Picker.Item label="Sports" value="sports" />
                        <Picker.Item label="Technology" value="tech" />
                    </Picker>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { console.log("YES"); this.setState({ emojiTime: true }) }}>
                        <Text>{this.state.emoji}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1
                }}
                >
                    <TextInput
                        style={{
                            marginTop: 50,
                            height: 50,
                            paddingLeft: 6,
                        }}
                        selectionColor="#428AF8"
                        underlineColorAndroid="#428AF8"
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Description of event..."
                        onChangeText={(description) => this.setState({ description })}
                    />
                </View>

                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
                <View style={{ marginTop: 100 }}>
                    <Button

                        onPress={() => { console.log("hi") }}
                        title="Next"
                        color="#841584"
                    />
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    emojiSelector: {
        marginTop: 20,
        height: '100%'
    },
    container: {
        marginTop: 50,
        //   flex: 1,
        flexDirection: 'row',
    },
    emoji: {
        marginLeft: 50
    },
    button: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginLeft: 75,
        width: 50,
        height: 50
    },
});