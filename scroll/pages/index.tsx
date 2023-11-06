import Image from 'next/image'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
    <Header label='Home' />
   </> 
    )
}
