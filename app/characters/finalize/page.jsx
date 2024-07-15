'use client'
import React, { useEffect, useState } from 'react';
import CharacterFinalize from '@/components/CharacterFinalize';
import { useRouter } from 'next/navigation';

const CharacterFinalizePage = () => {
  const router = useRouter();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const characterParam = queryParams.get('character');

    if (characterParam) {
      try {
        const decodedCharacter = JSON.parse(decodeURIComponent(characterParam));
        console.log('Decoded Character:', decodedCharacter);
        setCharacter(decodedCharacter);
      } catch (error) {
        console.error('Failed to decode character data:', error);
      }
    } else {
      console.log('Character parameter is not available');
    }
  }, []);

  const handleSaveCharacter = (updatedCharacter) => {
    setCharacter(updatedCharacter);
    console.log('Character saved:', updatedCharacter);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
        <CharacterFinalize character={character} onSave={handleSaveCharacter} />
      </div>
    </div>
  );
};

export default CharacterFinalizePage;
