import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HiddenLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='AddFoodScreen'
      />
      <Stack.Screen
        name='SearchFoodScreen'
      />
      <Stack.Screen
        name='AdjustGoalsScreen'
      />
    </Stack>
  )
}

export default HiddenLayout