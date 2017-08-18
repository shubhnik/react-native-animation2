/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Easing
} from 'react-native';

const SCREENHEIGHT = Dimensions.get('window').height
let drawerMotion;

export default class drawer extends Component {

  componentWillMount(){
    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (e, gestureState) => true,

      onMoveShouldSetPanResponder: (e, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.animation.setOffset(this.state.animation._value);
      },

      onPanResponderRelease: (e, gestureState) => {
        if(gestureState.dx>100){
          this.state.animation.flattenOffset()
        }
        if(gestureState.dx < 0){
          Animated.timing(
              this.state.animation,
              {
                toValue:-(200 - gestureState.dx),
                duration:500
              }
          ).start( () => this.state.animation.flattenOffset())
        }
        if(gestureState.dx<100 && gestureState.dx > 0){
           Animated.timing(
             this.state.animation,
             {
               toValue:-(gestureState.dx),
               duration:500
             }
           ).start(()=>this.state.animation.flattenOffset())
        }else if(gestureState.dx == 0){
            Animated.timing(
                this.state.animation,
                {
                    toValue:-(200 - gestureState.dx),
                    duration:500
                }
            ).start( () => this.state.animation.flattenOffset())
        }
        
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.animation},
      ])
    })
  }

  showDrawer(){
    Animated.timing(
      this.state.animation,
      {
        toValue:0,
        duration:500,
        easing:Easing.linear
      }
    ).start();
  }

  state={
    animation : new Animated.Value(0)
  }

  render() {
      drawerMotion = this.state.animation.interpolate({
      inputRange: [0,100],
      outputRange:[-200,0],
      extrapolate:'clamp'
    })
    return (
      <View style={{flex:1,backgroundColor:'yellowgreen', justifyContent:'center'}} {...this._panResponder.panHandlers}>
        <Animated.View style={{backgroundColor:'cyan',height:SCREENHEIGHT ,width:200,transform:[{translateX:drawerMotion}]}}>
          <Text>Hello</Text>
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}); 

AppRegistry.registerComponent('drawer', () => drawer);