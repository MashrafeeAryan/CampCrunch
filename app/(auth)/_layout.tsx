import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
            name='LoginScreen'
            options={{headerShown: false}}

        />
        
        <Stack.Screen 
            name='SignUpScreen'
                        options={{headerShown: false}}

        />
    </Stack>
  )
}

export default AuthLayout