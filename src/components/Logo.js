import Image from 'next/image'
import logo from '@/assets/logo.png'

export default function Logo () {
  return (
    <Image
      src={logo}
      alt="logo"
      width={104}
      height="auto"
    />
  )
}
