import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
} from "react-native";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { styled } from "nativewind";

// Wrap Animated.View with Tailwind support using NativeWind
const AnimatedView = styled(Animated.View);

/**
 * MascotWithDialogue component displays an animated mascot image
 * with a dialogue bubble above it. The bubble types out text letter-by-letter
 * and can optionally close via a provided `onClose` callback.
 *
 * Props:
 * - message (string): The message the mascot will "say" (typed out char-by-char).
 * - onClose (function): Optional callback triggered when the mascot is dismissed.
 */
const MascotWithDialogue = ({ message = "", onClose }) => {
    // scaleAnim controls the scale animation of the entire mascot/dialogue
    const scaleAnim = useRef(new Animated.Value(0)).current;

    // State to hold the progressively typed message (for typewriter effect)
    const [displayedText, setDisplayedText] = useState("");

    // Ref to track the current character index while typing
    const indexRef = useRef(0);

    // Effect to:
    // 1. Animate the mascot/dialogue popping into view
    // 2. Begin the typewriter effect for the message
    // 3. Optionally auto-close the mascot after a timeout (commented out)
    useEffect(() => {
        // Animate mascot/dialogue scale from 0 to 1 with a spring bounce
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        // Start an interval to simulate typewriter effect
        const interval = setInterval(() => {
            // If more characters remain, append the next one
            if (indexRef.current < message.length) {
                const nextChar = message.charAt(indexRef.current);
                setDisplayedText((prev) => prev + nextChar);
                indexRef.current += 1;
            } else {
                // Message complete — clear the interval
                clearInterval(interval);
            }
        }, 15); // Typing speed: every 15ms a new character appears

        // Optionally auto-close the mascot after a delay (commented out)
        // const timeout = setTimeout(() => {
        //     Animated.timing(scaleAnim, {
        //         toValue: 0,
        //         duration: 300,
        //         useNativeDriver: true,
        //     }).start(() => onClose?.());
        // }, 200000);

        // Cleanup: clear interval and timeout (if enabled) when component unmounts
        return () => {
            clearInterval(interval);
            // clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatedView
            // Animate the overall mascot/dialogue container from top-left corner
            className="absolute top-[-205px] left-[0px] items-start"
            style={{ transform: [{ scale: scaleAnim }] }}
        >
            {/* === Dialogue Bubble === */}
            {/* Positioned above mascot, slightly right to align with mascot's head */}
            <View className="relative mb-2 ml-[20px] max-w-[250px] bg-white p-3 pr-7 rounded-2xl shadow-lg shadow-black/20 elevation-10">
                {/* The message being typed out — bold styling */}
                <Text className="text-base font-bold">
                    Whoa, {displayedText}
                </Text>

                {/* Tail of the speech bubble — points down-left toward mascot head */}
                <View className="absolute bottom-[-10px] left-4 w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-white" />
            </View>

            {/* === Mascot Image === */}
            {/* Placed below the bubble, using thumbsUpManLogo asset */}
            <Image
                source={infoPageLogos.thumbsUpManLogo}
                className="w-[150px] h-[150px]"
                resizeMode="contain"
            />
        </AnimatedView>
    );
};

export default MascotWithDialogue;
