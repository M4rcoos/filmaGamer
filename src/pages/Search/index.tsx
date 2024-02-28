import { useRoute, RouteProp } from '@react-navigation/native';
import { IArena } from '../../interfaces/IArena';
import { Button, FlatList, Image, Text, View,StyleSheet } from "react-native";
import * as C from './styles'
import { useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { theme } from "../../styles/theme";
import {  Feather } from '@expo/vector-icons';
import { Api, token } from '../../services/api';
import { IArenaResponse, IArenaVideo } from '../../interfaces/IVideoPlayer';

type SearchScreenParams = {
  nomArena: IArena['NomArena'];
};


export function Search() {
  const route = useRoute<RouteProp<Record<string, SearchScreenParams>, string>>();
  const [response, setResponse] = useState<IArenaVideo[]>([])
  const nomArena  = route.params?.nomArena;



useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await Api.post<IArenaResponse>(
        "/",
        { 
          Consulta : "SelVideosGamer", 
          Parametros: `'2023-07-08', '2023-07-08', '${nomArena}'`, 
          Tipo: "J"
         } 
         ,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );
      setResponse(response.data.result);
      
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

fetchData()
},[nomArena])
 

  interface IVideoPlayer {
    id:number,
    name:string,
    title:string,
    date:string
    local: string
   }

 
const video =useRef(null);
  const [status, setStatus] =useState({});
  return (
    <>
    {nomArena ? (
      <C.Container>
      <FlatList
        data={response}
        keyExtractor={(item) => String(item.DatUpload)}
        renderItem={({ item }) => (
          <C.Content >
             <Text style={styles.local}>{item.NomArena} {item.DatHora}</Text>
             <C.Favorite>
    
    <Feather name="heart" size={24} color={theme.colors.green_700}  />
    
    </C.Favorite>
            <Video
           ref={video}
           style={styles.video}
            source={{ uri: item.play }}
            
           useNativeControls
           resizeMode={ResizeMode.CONTAIN}
           isLooping
           onPlaybackStatusUpdate={status => setStatus(() => status)}
         />
            <C.Footer >
    
              <Text style={styles.title}>{item.NomExibicao}</Text>
              
            </C.Footer>
          </C.Content>
        )}
      />
        
      
      
     
     </C.Container>
      
    ):<Text>tem nada</Text>
    
    }
    
    </>
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