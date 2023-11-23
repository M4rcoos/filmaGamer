import { FlatList, Image, Text, View } from "react-native";
import * as C from './styles'
import { ScrollView } from "react-native-gesture-handler";


export function Video(id: number, title:string ) {

 
  return (
  <>
 <C.Container>
  <Text>
    {title}
  </Text>
  <Text>
    {id}
  </Text>
 </C.Container>
  </>
  );
}