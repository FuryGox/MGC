import {useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Stack } from "expo-router";
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import getFirmInfo from '~/api/getfirm-info';
import { Image } from "react-native";
import { Firm_API_Info, Firm_API_server } from '~/lib/datatype/api/firm';
export default function FirmDetailLayout() {
  const { slug } = useLocalSearchParams()
  const router = useRouter();
  const [firmData, setFirmData] = React.useState<Firm_API_Info>();
  const [episodes, setEpisodes] = React.useState<Firm_API_server[]>();
  const [loading, setLoading] = React.useState(true);
  const [loaderror, setLoadError] = React.useState<Error | undefined>();
  React.useEffect(() => {
    fetchFirmData();
  }, [slug]);
  const fetchFirmData = async () => {
    try {
      if (typeof slug === 'string') {
        const { firmInfo, episodes } = await getFirmInfo(slug);
        setFirmData(firmInfo);
        setEpisodes(episodes);
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
          <ScrollView>
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
              <View>
                {episodes?.map((server) => (
                  <View key={server.server_name} className="mt-4">
                    <Text className="text-lg text-black dark:text-white">
                      {server.server_name}
                    </Text>
                    {server.server_data.map((episode) => (
                      <Pressable
                        onPress={() => router.push({ 
                          pathname: `/(main)/player`,
                          params: {
                            link_embed: episode.link_embed,
                            link_m3u8: episode.link_m3u8,
                            filename: episode.filename,
                            name: episode.name,
                            slug: episode.slug,
                            server_name: server.server_name,
                          }
                        } )}
                        key={episode.slug} className="mt-2">
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          {episode.name}
                        </Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          {episode.filename}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}