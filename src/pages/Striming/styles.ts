import styled from 'styled-components/native'
import { theme } from '../../styles/theme'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color:  ${theme.colors.gray_25};
  padding: 16px;
  
`
export const Content = styled.TouchableOpacity`
 flex-direction: row;
 gap:8px;
 align-items:center;
  margin-top: 18px;
  border-color: 'red';
`
export const Text = styled.Text`
  font-size: 24px;
    color: ${theme.colors.gray_20};
    max-width: min-content;
`
export const Footer = styled.View`
flex-direction:row;
justify-content: space-around;
width: 100%;
padding-bottom:14px;
padding-top:14px;
border-bottom-color: ${theme.colors.gray_20};
border-bottom-width: 2px;
`
export const Favorite = styled.TouchableOpacity`

`
