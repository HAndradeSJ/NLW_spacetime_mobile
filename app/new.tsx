import { Text, View } from 'react-native'
import NLWLogo from '../src/assets/logo.svg'
import { Link } from 'expo-router'

export default function NewMemory() {
  return (
    <View className="flex-1 px-8">
      <View className='flex-row'>
        <NLWLogo />

        <Link href="/memories" className='h-10 w-10 items-center justify-center rounded-full bg-purple-500'></Link>
      </View>
    </View>
  )
}
