import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen 
            name='LoginScreen'

        />
        
        <Stack.Screen 
            name='SignUpScreen'
        />
    </Stack>
  )
}

export default AuthLayout