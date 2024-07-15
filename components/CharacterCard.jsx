import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CharacterCard = ({ character }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg relative flex flex-col">
      <Image
        src={`/images/characters/${character.portraits[0]}`}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4 flex-grow">
        <div className="text-left mb-4">
          <div className="text-gray-600 text-base">{character.name}</div>
          <h3 className="text-xl font-bold">{character.age} years old</h3>
        </div>
        <h3 className="absolute top-3 right-3 bg-sky-200 px-3 py-1 rounded-lg text-blue-500 font-bold text-sm">
          {character.gender}
        </h3>
        <div className="flex justify-center gap-2 text-green-900 text-sm mb-3">
          <p><i className="fa-solid fa-money-bill"></i> {character.location}</p>
        </div>
        <div className="border border-gray-200 mb-4"></div>
        <div className="flex flex-col lg:flex-row justify-between mb-3">
          <div className="flex items-center gap-2 text-sm">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span className="text-orange-700">{character.region}</span>
          </div>
          <Link
            href={`characters/${character._id}`}
            className="h-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Modify
          </Link>
          <Link
            href={`characters/${character._id}`}
            className="h-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default CharacterCard;
