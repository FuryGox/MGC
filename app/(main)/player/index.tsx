import { useEvent } from 'expo';
import { useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from '~/components/ui/text';
export default function PlayerScreen() {
  const { link_embed , link_m3u8 , filename , name , slug , server_name } = useLocalSearchParams();
  const videoSource: string = Array.isArray(link_m3u8) ? link_m3u8[0] : link_m3u8 || '';
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 50,
    },
    video: {
      width: 350,
      height: 275,
    },
    controlsContainer: {
      padding: 10,
    },
  });
  return (
    <View style={styles.contentContainer}>
    <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
    <View style={styles.controlsContainer}>
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => {
          if (isPlaying) {
            player.pause();
          } else {
            player.play();
          }
        }}
      />
    </View>
  </View>
  )
}

