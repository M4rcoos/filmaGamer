import React from "react";

import { View, Text, StyleSheet } from 'react-native'

export function Search() {
  return (
    <>
        <View style={style.Container} >
          <Text style={style.text}>
            Procure o video que deseja
          </Text>
        </View>
      </>
      )
}

const style = StyleSheet.create({
  Container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ff0000'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})