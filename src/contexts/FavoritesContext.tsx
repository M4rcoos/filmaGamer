import { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import { IVideoPlayer } from '../interfaces/IVideoPlayer';

interface FavoriteContextProps {
favorites:IVideoPlayer[]
setFavorites: React.Dispatch<React.SetStateAction<IVideoPlayer[]>>
}
const INITIAL_VALUE_FAVORITES:IVideoPlayer[] = []
export const FavoriteContext = createContext<FavoriteContextProps>({
  favorites:[],
  setFavorites:()=>{},
});

export const FavoriteProvider = ({children}: { children: React.ReactNode }) =>{
  const [favorites, setFavorites] = useState<IVideoPlayer[]>(INITIAL_VALUE_FAVORITES);
  return (
    <FavoriteContext.Provider value={{favorites,setFavorites}}>
      {children}
    </FavoriteContext.Provider>
  )
}

