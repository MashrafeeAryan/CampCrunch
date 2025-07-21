import { Stack } from 'expo-router';
import React from 'react';

const InfoLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="infoHome" />
      <Stack.Screen name="allergies" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="goalPage" />
      <Stack.Screen name="soundIntro" />
      <Stack.Screen name="pandaAppears" />
      <Stack.Screen name="panda_intro" />
      <Stack.Screen name="panda_explain" />
      <Stack.Screen name="chumpz_intro" />
      <Stack.Screen name="chumpz_growth" />
      <Stack.Screen name="chumpz_info" />
    </Stack>
  );
};

export default InfoLayout;
