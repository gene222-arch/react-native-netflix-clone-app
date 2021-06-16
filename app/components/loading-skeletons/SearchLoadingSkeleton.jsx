import React from 'react'
import View from './../View';
import Text from './../Text';
import { Dimensions, StyleSheet , Easing } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { block, Clock, cond, EasingNode, eq, set, startClock, timing, useCode, Value } from 'react-native-reanimated'

const { width } = Dimensions.get('window');
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const runTiming = (clock) => {

    const state = {
        finishedValue: new Value(0),
        position: new Value(0),
        frameTime: new Value(0),
        time: new Value(0),
    };

    const config = {
        toValue: new Value(0),
        duration: 1000,
        easing: EasingNode.inOut(EasingNode.ease)
    };

    return block([
        timing(clock, state, config),
        cond(eq(state.finishedValue, 1), [
            set(state.finishedValue, 0),
            set(state.position, 0),
            set(state.frameTime, 0),
            set(state.time, 0)
        ]),
        state.position
    ]);
};


const SearchLoadingSkeleton = ({ children }) => 
{
    const animatedValue = new Animated.Value(0);
    const clock = new Clock();

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 2, width * 2],
    });
    
    useCode(() => block([
        startClock(clock),
        set(animatedValue, runTiming(clock))
    ]), [clock, animatedValue]);

    return (
        <View
            style={{
                backgroundColor: "#a0a0a0",
                borderColor: "#b0b0b0",
                height: 150,
                width: width,
            }}
        >
            <AnimatedLinearGradient
                colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    ...StyleSheet.absoluteFill,
                    transform: [{ translateX }],
                }}
            />
            {children}
        </View>
    )
}

export default SearchLoadingSkeleton
