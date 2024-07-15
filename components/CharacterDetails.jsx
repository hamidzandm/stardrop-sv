import React from 'react'
import {
    FaMapMarker
} from 'react-icons/fa'
import Image from 'next/image';

const isDatable = true;
const gender = (character) => {
  return character.gender === 'female' ? 'Her' : 'His';
};
const gender_ = (character) => {
  return character.gender === 'female' ? 'She' : 'He';
};

const CharacterDetails = ({character}) => {
  return (
    <main>
    
    <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
  <div className="text-gray-500 mb-4">{character.age} years old</div>
  <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
  <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
    <FaMapMarker className='text-red-700'/>
    <p className="text-orange-700">{character.location}</p>
  </div>

  <div className="flex justify-center mb-0">
  <Image 
    src={`/images/characters/${character.portraits[0]}`}
    alt=""
    height={0}
    width={0}
    sizes='100vw' 
    className="w-1/2 h-auto rounded-t-xl object-contain"
  />
</div>

  <h3 className="text-lg text-center font-bold my-6 bg-gray-800 text-white p-2">
    Characteristics
  </h3>
  <div className="flex flex-col md:flex-row justify-around">
    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
      <div className="text-gray-500 mr-2 font-bold">{character.gender}</div>
      <div className="text-2xl font-bold">
        <i className="fa fa-xmark text-red-700"></i>
      </div>
    </div>
    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
      <div className="text-gray-500 mr-2 font-bold">Birthday</div>
      <div className="text-xl font-bold text-blue-500">{character.birthday}</div>
    </div>
    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
      <div className="text-gray-500 mr-2 font-bold">{character.region}</div>
    </div>
  </div>
</div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Description </h3>
              <p className="text-gray-500 mb-4">
              {character.name}, a seasoned photographer, moved to Stardew Valley after a recent divorce, seeking peace and a new beginning.</p>
              <p className="text-gray-500 mb-4 text-justify">
              He’s passionate about photography and tea. He loves discussing and sharing different tea blends.
He usually walks around the farm in the morning, capturing the morning light. “The light here is just perfect for capturing the start of a new day.”
In the evening, he relaxes at Stardrop Saloon, shares stories.

{/* Tea Enthusiast: "A good cup of tea can be as invigorating as it is calming."
Beer Expert: “There's a certain camaraderie that comes with sharing a cold beer at the end of the day.”

Reflective & Introspective: Finds beauty in simplicity, often lost in thought.
Gentle & Kind: Always willing to help and share his wisdom.
Creative & Artistic: Passionate about photography, seeing the world through his lens.
Reserved but Friendly: Approachable, enjoys deep, meaningful conversations. */}



              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Details</h3>

              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
              >
                <li>
                  <i className="fas fa-check text-green-600 mr-2 mt-3"></i> 
                  {gender_(character.gender)} is {isDatable ? 'datable' : 'not datable'}
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                  {character.manners}
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                  {character.social}
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                  {gender(character.gender)} optimism is {character.optimism}
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                  {gender(character.gender)} food is {character.favorites.food}
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                  {gender(character.gender)} gift is {character.favorites.gift}
                </li>
              </ul>
            </div>
          </main>
  )
}

export default CharacterDetails
