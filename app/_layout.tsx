// IMPORTAÇÕES
import { styled } from 'nativewind'
import Stripts from '../src/assets/stripes.svg'
import Bluer from '../src/public/luz.png'
import { ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen, Stack } from 'expo-router'
import { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
// Importando as fontes
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'


const StyledStripes = styled(Stripts)

export default function Layout() {
  // usando o usestate pata ver se está autenticado o usuario
  const [isauthenticad, setisauthenticad] = useState<null | boolean>(null)


  //usando o useEffect para transformar o usario em um boleano
  useEffect(() => {
        SecureStore.getItemAsync('token').then((token =>{
            setisauthenticad(!!token)
        })
  }, []);   

  // função que retorna um boleano enquanto as fonts nn carregar
  const [hadsloadfonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  //   Enquanto as fontes nn carega mostra o SplashScreen
  if (!hadsloadfonts) {
    return <SplashScreen />
  }
  return (
    <ImageBackground
      source={Bluer}
      className="flex-1 relative bg-gray-900 "
      imageStyle={{ positon: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="abosolute left-2" />
      <StatusBar style="light" translucent />

      {/* animatção fluida  */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}>

         <Stack.Screen name = 'index' redirect={isauthenticad}/>
         <Stack.Screen name = 'new'/>
         <Stack.Screen name = 'memories'/>

        </Stack>
    </ImageBackground>
  )
}
