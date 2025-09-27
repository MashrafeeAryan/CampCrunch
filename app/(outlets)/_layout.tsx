import { Stack } from 'expo-router';
import React from 'react';

const OutletLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PandaExpressScreen" />
    </Stack>
  );
};

export default OutletLayout;
