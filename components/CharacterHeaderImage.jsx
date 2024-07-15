import React from 'react'
import Image from 'next/image'
import Header from '@/public/images/stardew_valley_header.png'

// const CharacterHeaderImage = ({image}) => {
const CharacterHeaderImage = () => {

  return (
    <section>
    <div className="container-xl m-auto">
      <div className="grid grid-cols-1">
        <Image
          // src={`/images/characters/${image}`}
          src={Header}
          alt=""
          className="object-cover h-[450px] w-full"
          width={0}
          height={0}
          sizes='100vw'
          priority={true}
        />
      </div>
    </div>
  </section>
  )
}

export default CharacterHeaderImage
