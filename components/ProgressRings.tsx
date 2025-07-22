// Import the core React library and its hooks
import React, { useEffect, useRef, useState } from 'react';

// Import React Native components for layout, animation, and screen handling
import { View, Text, Animated, StyleSheet, Pressable, Dimensions } from 'react-native';

// Import SVG support to draw vector graphics (circles)
import Svg, { Circle } from 'react-native-svg';
import { useUserHealthStore } from './zustandStore/UserHealthStore';

// Enable the <Circle> element to be animated using React Native's Animated API
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Get the device's screen width so we can calculate a responsive size
const screenWidth = Dimensions.get('window').width;

// Calculate a responsive ring size (80% of screen width, max 300px)
const ringSize = Math.min(screenWidth * 0.5, 250);
const dynamicStrokeWidth = ringSize * 0.05; // Stroke is 5% of ring size

// Define the nutrition metrics: each object contains info about one nutrient


// This component displays animated rings and handles user interaction
const ProgressRings = ({ size = ringSize, strokeWidth = dynamicStrokeWidth, protein, carbs, fat, dailyCalorieAdjustment }) => {
  // Calculate the center of the SVG canvas
  const metrics = [
  { key: 'calories', color: '#3498db', value: 800, goal: dailyCalorieAdjustment },
  { key: 'protein',  color: '#e74c3c', value: 50,  goal: protein },
  { key: 'carbs',    color: '#9b59b6', value: 120, goal: carbs },
  { key: 'fat',      color: '#f1c40f', value: 40,  goal: fat },
];
  const center = size / 2;

  // Calculate the base radius for the outermost ring
  const baseRadius = (size - strokeWidth) / 2;

  // Create animated values for each ring; these values control how much of the ring is shown
  const animations = useRef(
    metrics.map(() => new Animated.Value(2 * Math.PI * baseRadius))
  ).current;

  // Manage the popup state when a ring is tapped
  const [popup, setPopup] = useState({
    visible: false,
    metric: null,
    x: 0,
    y: 0,
  });

  // When the component is mounted, animate all rings based on nutrient progress
  useEffect(() => {
    const anims = metrics.map((metric, index) => {
      const radius = baseRadius - index * (strokeWidth + 4);
      const circumference = 2 * Math.PI * radius;
      const percent = Math.min(metric.value / metric.goal, 1);
      const offset = circumference * (1 - percent);

      return Animated.timing(animations[index], {
        toValue: offset,
        duration: 1000,
        useNativeDriver: true,
      });
    });

    Animated.stagger(200, anims).start();
  }, []);

  // Show popup when a ring is tapped
  const handleRingPress = (metric, evt) => {
    setPopup({
      visible: true,
      metric,
      x: evt.nativeEvent.locationX,
      y: evt.nativeEvent.locationY,
    });
  };

  // Hide popup when the user taps elsewhere
  const handleBackgroundPress = () => {
    if (popup.visible) {
      setPopup({ visible: false, metric: null, x: 0, y: 0 });
    }
  };

  // Approximate width of the popup box to help keep it on screen
  const popupWidth = 130;

  return (
    <Pressable onPress={handleBackgroundPress} style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {metrics.map((metric, index) => {
          const radius = baseRadius - index * (strokeWidth + 4);
          const circumference = 2 * Math.PI * radius;

          return (
            <React.Fragment key={metric.key}>
              <Circle
                stroke="#eee"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                transform={`rotate(-90 ${center} ${center})`}
              />
              <AnimatedCircle
                stroke={metric.color}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={animations[index]}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
                onPress={(evt) => {
                  evt.stopPropagation();
                  handleRingPress(metric, evt);
                }}
              />
            </React.Fragment>
          );
        })}
      </Svg>

      <View style={styles.centerText}>
        <Text style={styles.centerValue}>{metrics[0].value}</Text>
        <Text style={styles.centerLabel}>of {metrics[0].goal}</Text>
      </View>

      {popup.visible && popup.metric && (
        <View
          style={[
            styles.popup,
            {
              top: popup.y - 60,
              left: Math.max(
                10,
                popup.x + popupWidth > screenWidth
                  ? screenWidth - popupWidth - 10
                  : popup.x
              ),
              borderColor: popup.metric.color,
            },
          ]}>
          <Text style={[styles.popupTitle, { color: popup.metric.color }]}>  
            {popup.metric.key.toUpperCase()}
          </Text>
          <Text style={[styles.popupText, { color: popup.metric.color }]}>  
            {popup.metric.value} / {popup.metric.goal}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerValue: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
  },
  centerLabel: {
    fontSize: 13,
    color: '#666',
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1.5,
    zIndex: 100,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  popupText: {
    fontSize: 12,
  },
});

export default ProgressRings;
