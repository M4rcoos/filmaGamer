import { Button, FlatList, Image, Text, View, StyleSheet } from "react-native";
import * as C from "./styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { theme } from "../../styles/theme";

import { Api, token } from "../../services/api";
import { IApiResponseArena } from "../../interfaces/IArena";
import { IVideoInfo } from "../../interfaces/IVideoPlayer";

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
  
async function handleVideos  (name: string){
  try {
    const response = await Api.post<IVideoInfo>(
      "/",
      {
        Consulta: "SelArenas",
        Parametros: "'2023-07-08', '2023-07-08', 'ArenaSantana'",
        Tipo: "J",
      },
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      }
    );
    
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
} 
  return (
    <C.Container>
 {response?.result.map((arena, index) => (
        <C.Content key={index}>
          <Image source={{ uri: arena.Logo }} style={{ width: 100, height: 100 }} />
          <C.Text>{arena.NomExibicao}</C.Text>
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
