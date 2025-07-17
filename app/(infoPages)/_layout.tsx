import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const InfoLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen 
            name='infoHome'

        />
        <Stack.Screen
            name='allergies'
        />
        <Stack.Screen
            name='preferences' 
        />
        <Stack.Screen
            name='goalPage'
        />

        <Stack.Screen
            name='soundIntro'
        />

    </Stack>
  )
}

export default InfoLayout