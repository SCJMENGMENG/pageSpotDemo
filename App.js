/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Animated,
    TextInput,
    Dimensions,
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const screenHeigth = Dimensions.get('window').height;

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            num:0,
        };

        this.keyboardHeight = new Animated.Value(0);

    }

    componentWillMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShow.remove();
        this.keyboardDidHide.remove();
    }

    keyboardDidShow = (event) => {

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 300,
            }),
        ]).start();
    };

    keyboardDidHide = (event) => {

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
        ]).start();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To ssssget started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Text onPress={()=>{
                    if (this.state.num <8){
                        this.setState({
                            num:this.state.num + 1,
                        })
                    }
                }}>点我 +</Text>
                <Text onPress={()=>{
                    if (this.state.num >0){
                        this.setState({
                            num:this.state.num - 1,
                        })
                    }
                }}>点我 -</Text>
                {this.spotModule(9,this.state.num)}

                <Animated.View style={{marginBottom:this.keyboardHeight}}>
                    <TextInput
                        style={{
                            backgroundColor: "cyan",
                            width: 200,
                            height: 20,
                            marginTop:100,
                        }}
                    />
                </Animated.View>
            </View>
        );
    }

    spotModule(count,num) {

        let spots = [];
        for (let i = 0; i < count; i++) {
            let spot = <View style={{
                width: 20,
                height: 20,
                backgroundColor: num == i ? 'cyan' : 'red',
                margin: 4
            }}/>
            spots.push(spot)
        }

        return <View style={{
            flexDirection: 'row',
            marginTop:screenHeigth - 50,
            position: 'absolute',
            backgroundColor: 'yellow',
        }}>
            {spots}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
