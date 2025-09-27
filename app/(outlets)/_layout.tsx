import { Stack } from 'expo-router';
import React from 'react';

const OutletLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PandaExpressScreen" screenOptions={{ headerShown: false }}/>
      <Stack.Screen name="SubwayScreen" />
      <Stack.Screen name="StarbucksScreen" />
      <Stack.Screen name="ChickFilAScreen" />
      <Stack.Screen name="EinsteinScreen" />
      <Stack.Screen name="BentoSushiScreen" />
      <Stack.Screen name="SouthernWingsScreen" />
      <Stack.Screen name="MoesScreen" />
      <Stack.Screen name="BlenzScreen" />
    </Stack>
  );
};
export default OutletLayout;
