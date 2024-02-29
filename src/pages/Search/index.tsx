import { useRoute, RouteProp } from '@react-navigation/native';
import { IArena } from '../../interfaces/IArena';
import { Button, FlatList, Image, Text, View, StyleSheet } from "react-native";
import * as C from './styles'
import React, { useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { theme } from "../../styles/theme";
import { Feather } from '@expo/vector-icons';
import { Api, token } from '../../services/api';
import { IArenaResponse, IArenaVideo } from '../../interfaces/IVideoPlayer';
import { FlashList } from '@shopify/flash-list';

type SearchScreenParams = {
  nomArena: IArena['NomArena'];
};


export function Search() {
  const route = useRoute<RouteProp<Record<string, SearchScreenParams>, string>>();
  const [response, setResponse] = useState<IArenaVideo[]>([])
  const nomArena = route.params?.nomArena;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.post<IArenaResponse>(
          "/",
          {
            Consulta: "SelVideosGamer",
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
  }, [nomArena])


  interface IVideoPlayer {
    id: number,
    name: string,
    title: string,
    date: string
    local: string
  }


  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <>
      {nomArena ? (
        <C.Container>


 
          <FlashList
            data={response}
            keyExtractor={(item) => String(item.DatUpload)}
            renderItem={({ item }) => (
              <C.Content >
                <Video
                  ref={video}
                  style={styles.video}
                  source={{ uri: item.play }}
                  focusable={true}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                <C.Description>
                  <View>
                    <Text style={styles.local}>{item.NomExibicao}</Text>
                    <Text style={styles.local}>{item.DatHora}</Text>
                  </View>
                  <C.Favorite>
                    <Feather name="heart" size={24} color={theme.colors.green_700} />
                  </C.Favorite>


                </C.Description>

              </C.Content>
            )}
          />
        </C.Container>

      ) : <Text>tem nada</Text>

      }

    </>
  );
}
const styles = StyleSheet.create({
  local: {
    fontSize: 13,
    color: theme.colors.gray_20,
    fontWeight: 'bold',
    maxWidth: 300

  },
  title: {

    fontSize: 20,
    color: theme.colors.green_700,
    fontWeight: 'bold'
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});