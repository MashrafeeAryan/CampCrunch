import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tabBarLogos from '@/assets/images/tabBarLogos'

const ChallengeScreen = () => {
  return (
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <Image
            source={tabBarLogos.workOnPregressLogo}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
  )
}

export default ChallengeScreen