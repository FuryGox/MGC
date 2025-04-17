import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import getFirmInfo from '~/api/getfirm-info';
import { Image } from "react-native";
import { Firm_API_Info } from '~/lib/datatype/api/firm';
export default function FirmDetailLayout() {
  const { slug } = useLocalSearchParams()
  const [firmData, setFirmData] = React.useState<Firm_API_Info>();
  const [loading, setLoading] = React.useState(true);
  const [loaderror, setLoadError] = React.useState<Error | undefined>();
  React.useEffect(() => {
    fetchFirmData();
  }, [slug]);
  const fetchFirmData = async () => {
    try {
      if (typeof slug === 'string') {
        const data = await getFirmInfo(slug);
        setFirmData(data);
      } else {
        throw new Error('Invalid slug format');
      }
    } catch (error) {
      setLoadError(error as Error);
    } finally {
      setLoading(false);
    }
  };
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
      <View className="flex-1 items-center justify-center">
        {loading ? (
          <Text className="text-lg text-gray-500 dark:text-gray-400">Loading...</Text>
        ) : loaderror ? (
          <Text className="text-lg text-red-500 dark:text-red-400">
            Error: {loaderror.message}
          </Text>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Image
              source={{ uri: firmData?.poster_url }}
              className="w-[300px] h-[400px] rounded-md"
              resizeMode="cover"
            />
            <Text className="text-lg text-black dark:text-white">{firmData?.name}</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {firmData?.origin_name}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {firmData?.content}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Status: {firmData?.status}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Type: {firmData?.type}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Time: {firmData?.time}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Current Episode: {firmData?.current_episode}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Total Episodes: {firmData?.total_episodes}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Quality: {firmData?.quality}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}