const pink = "FF8181"
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TouchableHighlight } from 'react-native';
var width = Dimensions.get('window').width;
import { Font, AppLoading } from "expo";
import { MaterialIcons } from '@expo/vector-icons';
export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    async componentWillMount() {

        await Font.loadAsync({
            Roboto: require("./Roboto.ttf")
        });
        this.setState({ loading: false });
    }

    render() {
        console.log(this.props);
        if (this.state.loading) {
            return (<Text>Loading</Text>)
        }
        return (
            <View style={styles.topbar}>
                <TouchableHighlight onPress={() => { this.props.callback }}>
                    <MaterialIcons name="arrow-back" size={32} color="black" />
                </TouchableHighlight>

                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    topbar: {
        position: 'absolute',
        top: 0,
        height: 60,
        width: width,
        left: 0,
        backgroundColor: '#FF8181',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 20
    },
    text: {
        fontSize: 24,
        fontFamily: 'Roboto',
        color: '#000000'
    },
    arrow: {
    }
});
//roboto, 24