import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'

const FadeInOutView = ({ animation = 'fadeIn', animationStyle = {}, shouldFadeIn = true, children, ...props }) => 
{
    const [ opacity ] = useState(new Animated.Value(0));

    const fadeIn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        })
        .start();
    }

    const fadeOut = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        })
        .start()
    }

    useEffect(() => 
    {
        if (shouldFadeIn) {
            fadeIn();
        } else {
            fadeOut();
        }
    }, [shouldFadeIn]);

    return (
        <Animated.View 
            style={[
                {
                    opacity,
                    ...animationStyle
                },
                props.style
            ]}
            { ...props }
        >
            { children }
        </Animated.View>
    )
}

export default FadeInOutView
