import { Button, FlatList, Image, Text, View,StyleSheet } from "react-native";
import * as C from './styles'
import React, { useContext, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { theme } from "../../styles/theme";
import {  Feather, Entypo} from '@expo/vector-icons';
import { IVideoPlayer } from "../../interfaces/IVideoPlayer";
import { FavoriteContext } from "../../contexts/FavoritesContext";

export function Favorites() {
const {favorites, setFavorites} = useContext(FavoriteContext)
 
 
const addVideoToFavorite = (video: IVideoPlayer) => {
  const isAlreadyFavorite = favorites.some((favVideo) => favVideo.id === video.id);

  if (!isAlreadyFavorite) {
    setFavorites([...favorites, video]);
  }
};
const removeVideoFromFavorite =(video: IVideoPlayer)=>{
  setFavorites(favorites.filter((videoFavorite)=>video.id != videoFavorite.id))
}


const video =useRef(null);
const [status, setStatus] =useState({});
  return (
 <C.Container>
  {
    favorites.length > 0?(
      <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => {
        const isFavorite = favorites.some((favVideo) => favVideo.id === item.id);
        return (
          <C.Content>
            <Text style={styles.local}>{item.local} {item.date}</Text>
            <Video
              ref={video}
              style={styles.video}
              source={{ uri: item.name }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <C.Footer>
              <Text style={styles.title}>{item.title}</Text>
              <C.Favorite onPress={() => isFavorite ? removeVideoFromFavorite(item) : addVideoToFavorite(item)}>
                {
                  isFavorite?
                  <Entypo name="heart" size={24} color={theme.colors.green_700}/>
                  :
                  <Entypo name="heart-outlined" size={24} color={theme.colors.green_700} />
                }
              </C.Favorite>
            </C.Footer>
          </C.Content>
        );
      }}
    />
    ): <View style={styles.Container}>
    <Text style={styles.text}>
     Favorite Algum video para ele aparecer aqui ...
    </Text>
  </View>
  
  }
 
    
  
  
 
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
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.gray_20
  }
});