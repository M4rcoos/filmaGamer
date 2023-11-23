import { Button, FlatList, Image, Text, View,StyleSheet } from "react-native";
import * as C from './styles'
import { useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { theme } from "../../styles/theme";
import {  Feather } from '@expo/vector-icons';
export function Striming() {
  interface IVideoPlayer {
    id:number,
    name:string,
    title:string,
    date:string
    local: string
   }

  const data : IVideoPlayer[]= [{
    id:1,
    date:"11/09/2023 ás 19:30",
    local: "Quadra bate bola Fazendinha:",
    name:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    title: 'Big Buck'
  },
  {
    id:2,
    date:"13/09/2023 ás 17:30",
    local: "Quadra bate bola Fazendinha:",
    name:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    title: 'Big Buck 2'
  },
  {
    id:3,
    date:"05/10/2023 ás 08:30",
    local: "Quadra bate bola Fazendinha Quadra são caetano:",
    name:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    title: 'Big Buck 3'
  },
  {
    id:4,
    date:"05/10/2023 ás 09:30",
    local: "Quadra são caetano:",
    name:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    title: 'Big Buck 4'
  },
  
]
const video =useRef(null);
  const [status, setStatus] =useState({});
  return (
 <C.Container>
  <FlatList
    data={data}
    keyExtractor={(item) => String(item.id)}
    renderItem={({ item }) => (
      <C.Content >
         <Text style={styles.local}>{item.local} {item.date}</Text>
        <Video
       ref={video}
       style={styles.video}
        source={{ uri: item.name }}
        
       useNativeControls
       resizeMode={ResizeMode.CONTAIN}
       isLooping
       onPlaybackStatusUpdate={status => setStatus(() => status)}
     />
        <C.Footer >
          <Text style={styles.title}>{item.title}</Text>
          <C.Favorite>

          <Feather name="heart" size={24} color={theme.colors.green_700}  />
          </C.Favorite>
        </C.Footer>
      </C.Content>
    )}
  />
    
  
  
 
 </C.Container>
  );
}

const styles = StyleSheet.create({
  local:{
    fontSize:13,
    color:theme.colors.gray_20,
    fontWeight:'bold',
    maxWidth:300
    
  },
 title:{
  
   fontSize:20,
   color:theme.colors.green_700,
   fontWeight:'bold'
 },
  video: {
    alignSelf: 'center',
    width: 300,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});