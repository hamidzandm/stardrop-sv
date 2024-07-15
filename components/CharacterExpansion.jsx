import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CharacterExpansion = ({ character }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <div className="flex">
        {/* Left Section with Image and Basic Info */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 mb-4">
            <Image
              src={`/images/characters/${character.portraits[0]}`}
              alt={character.name}
              height={128}
              width={128}
              className="rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{character.name}, {character.age}</p>
            <p className="text-sm">{character.profession}</p>
          </div>
          <div className="mt-4 p-2 bg-gray-200 rounded-lg text-center">
            <p>EXAMPLE VISUALISATION</p>
          </div>
        </div>

        {/* Right Section with Detailed Info */}
        <div className="flex-grow ml-6">
          <h2 className="text-2xl font-bold mb-4">
            {character.name.split(' ')[0]}, a seasoned {character.profession}, moved to Stardew Valley after a recent divorce, seeking peace and a new beginning.
          </h2>
          <div className="p-4 bg-white rounded-lg shadow-md mb-4">
            <p>{character.description}</p>
            <p className="italic mt-2">“{character.quote}”</p>
          </div>
          <ul className="list-disc list-inside mb-4">
            {character.traits.map((trait, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{trait.title}:</span> {trait.description}
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link href="/dialogues" passHref
               className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Dialogues
            </Link>
            <Link href="/schedules" passHref
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Schedules
            </Link>
            <Link href="/customization" passHref
               className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Customization
            </Link>
            <Link href="/confirm" passHref
               className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Confirm
            </Link>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="What do you want to change?"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default CharacterExpansion;
