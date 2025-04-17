import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
export default function FirmDetailLayout() {
  const { slug } = useLocalSearchParams() // Assuming you have a slug in the query parameters
  return (
    <View className="flex flex-1 bg-background dark:bg-background-dark">
      <Stack.Screen
        name="index"
        options={{
          headerBackVisible: false,
          headerTitle: "Firm Detail",
          headerRight: () => <Text className="text-sm text-black dark:text-white">Right</Text>,
        }}
      />
      <Text className="text-lg font-bold text-black dark:text-white">{slug}</Text>
     
    </View>
  );
}