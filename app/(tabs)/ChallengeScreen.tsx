import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const challenges = [
  {
    title: 'Track It All Week',
    description: 'Log every meal for 7 days straight',
    progress: 2 / 7,
  },
  {
    title: 'Weekend Warrior',
    description: 'Hit your goal both Saturday and Sunday',
    progress: 3 / 7,
  },
  {
    title: 'Protein Monster',
    description: 'Eat more than 100g protein every day for a week',
    progress: 2 / 7,
  },
  {
    title: 'No Pizza Week',
    description: 'No pizza logged for an entire week',
    progress: 2 / 7,
  },
  {
    title: 'I Love Greens',
    description: 'Eat salad more than 5 times in a week',
    progress: 2 / 7,
  },
];

export default function WeeklyChallenges() {
  return (
    <View className="flex-1 bg-white  px-5 mt-10 pt-20">
      <Image
        source={require('../../assets/images/CampCrunchLogo.png')}
        className="w-20 h-20 self-center mb-2"
      />
      <Text className="text-2xl font-bold text-center mb-5">Weekly Challenges</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} >
        {challenges.map((challenge, index) => (
          <View key={index} className="bg-gray-100 rounded-xl p-4 mb-4">
            <Text className="text-lg font-bold mb-1">{challenge.title}</Text>
            <Text className="text-sm text-gray-600 mb-2">{challenge.description}</Text>

            <View
              style={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'black', // incomplete part color
                overflow: 'hidden',
              }}
            >
              <ProgressBar
                progress={challenge.progress}
                color="#FCD34D" // completed part color
                style={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'transparent', // make default track transparent
                }}
              />
            </View>

            <Text className="text-xs text-right text-gray-700 mt-1">
              {Math.round(challenge.progress * 7)}/7
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
