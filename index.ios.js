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
  Easing,
  Image,
  ScrollView
} from 'react-native';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREENWIDTH/1.5

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
                toValue:-(DRAWER_WIDTH - gestureState.dx),
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
                    toValue:-(DRAWER_WIDTH - gestureState.dx),
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

  state={
    animation : new Animated.Value(0)
  }

  render() {
      drawerMotion = this.state.animation.interpolate({
      inputRange: [0,100],
      outputRange:[-DRAWER_WIDTH,0],
      extrapolate:'clamp'
    })
    return (
      <View style={{flex:1,backgroundColor:'#ffa07a', justifyContent:'center'}} {...this._panResponder.panHandlers}>
        <Animated.View style={{height:SCREENHEIGHT ,width:DRAWER_WIDTH,transform:[{translateX:drawerMotion}]}}>
          <View style={{flex:1, backgroundColor:"#e0ffff"}}>
              <View style={{flex:3, justifyContent:'flex-end', alignItems:'center'}}>
                <Image source={require('./images/man_utd.jpg')} style={{height:130, width:130, borderRadius:65}} />
              </View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'#2e8b57', fontWeight:'500'}}>Shubhnik Singh</Text>
                <Text style={{color:'#2e8b57', fontWeight:'500'}}>Chandigarh, India</Text>
                <Text style={{color:'#2e8b57', fontWeight:'500'}}>Manchester United</Text>
              </View>
          </View>
          <View style={{flex:1, backgroundColor:'#fffacd'}}>
              <ScrollView>
                <View style={{height:75, paddingLeft:10, justifyContent:'center'}}>
                    <Text>REACT-NATIVE</Text>
                </View>
                <View style={{height:75, paddingLeft:10, justifyContent:'center'}}>
                    <Text>REDUX</Text>
                </View>
                <View style={{height:75, paddingLeft:10, justifyContent:'center'}}>
                    <Text>REACT</Text>
                </View>
                <View style={{height:75, paddingLeft:10, justifyContent:'center'}}>
                    <Text>GraphQL</Text>
                </View>
              </ScrollView>
          </View>
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