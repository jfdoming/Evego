import React from 'react';
import { Animated, Text, View } from 'react-native';
import MarkerCallout from "./MarkerCallout";

export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      slideAnim: new Animated.Value(-230),
      lastId: -1
    }
  }
  
  render() {
    let {slideAnim} = this.state;
    let calloutId = this.props.id == -1 ? this.state.lastId : this.props.id;
    
    if (this.props.id == -1) {
      this.state.lastId = this.props.id;
      
      Animated.timing(
        this.state.slideAnim,
        {
          toValue: -230,
          duration: 500,
        }
      ).start();
    } else if (this.props.id != this.state.lastId) {
      this.state.lastId = this.props.id;
      
      Animated.timing(
        this.state.slideAnim,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }
    
    return (
      <Animated.View style={{backgroundColor: "transparent", width: "100%", height: "35%", padding: 5, position: "absolute", bottom: slideAnim, left: 0}}>
        <View style={{elevation: 20, backgroundColor: "white", borderRadius: 10, width: "100%", height: "100%", padding: 10}}>
          <MarkerCallout id={calloutId}/>
        </View>
      </Animated.View>
    );
  }
}