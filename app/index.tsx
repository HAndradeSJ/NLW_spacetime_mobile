import { StatusBar } from 'expo-status-bar'
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { useEffect } from 'react'

// Importando a imgaem de blur e a linha
import Bluer from './src/public/luz.png'
import Stripts from './src/public/stripts.svg'
import Logo from './src/public/logo.svg'
import { styled } from 'nativewind'
import { api } from '../src/lib/api'
import Memories from './memories'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/2c69ccfa39fe92bdb28c',
}

const StyledStripes = styled(Stripts)

export default function App(): any {
  const router = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [response, logar] = useAuthRequest(
    {
      clientId: '2c69ccfa39fe92bdb28c',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'NLW Spacetime',
      }),
    },
    discovery,
  )
  async function githuauth(code: string) {
    api.post('/register', {
      code,
    })

    const { token } = response.data
    await SecureStore.setItemAsync('token', token)
    router.push('/Memories')
  }

  useEffect(() => {
    console.log(
      makeRedirectUri({
        scheme: 'NLW Spacetime',
      }),
    )
    if (response?.type === 'success') {
      const { code } = response.params

      githuauth(code)
    }
  }, [response])

  // função que retorna um boleano enquanto as fonts nn carregar
  const [hadsloadfonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })
  if (!hadsloadfonts) {
    return null
  }
  return (
    <ImageBackground
      source={Bluer}
      className="flex-1  items-center relative bg-gray-900 px-10 "
      imageStyle={{ positon: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="abosolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relex text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser
            ) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => logar()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
