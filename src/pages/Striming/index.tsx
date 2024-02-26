import { Button, FlatList, Image, Text, View, StyleSheet } from "react-native";
import * as C from "./styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { theme } from "../../styles/theme";
import { Feather, Entypo } from "@expo/vector-icons";
import { IVideoPlayer } from "../../interfaces/IVideoPlayer";
import { FavoriteContext } from "../../contexts/FavoritesContext";
import { Api, token } from "../../services/api";
import { IApiResponseArena } from "../../interfaces/IArena";

export  function Striming() {
  const [response, setResponse] = useState<IApiResponseArena | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.post<IApiResponseArena>(
          "/",
          {
            Consulta: "SelArenas",
            Parametros: "",
            Tipo: "J",
          },
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
          }
        );
        
        setResponse(response.data);
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };

    fetchData();
  }, [token])
  ;
  

  return (
    <C.Container>
 {response?.result.map((arena, index) => (
        <C.Content key={index}>
          <Image source={{ uri: arena.Logo }} style={{ width: 100, height: 100 }} />
          <C.Text>Quadra: {arena.NomExibicao}</C.Text>
        </C.Content>
      ))}
    </C.Container>
  );
}

const styles = StyleSheet.create({
  local: {
    fontSize: 13,
    color: theme.colors.gray_20,
    fontWeight: "bold",
    maxWidth: 300,
  },
  title: {
    fontSize: 20,
    color: theme.colors.green_700,
    fontWeight: "bold",
  },
  video: {
    alignSelf: "center",
    width: 300,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
