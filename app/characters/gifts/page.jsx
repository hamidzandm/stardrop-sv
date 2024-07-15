'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GiftTastes from '@/components/GiftTastes'; // Adjust the import path as necessary

const GiftTastesPage = () => {
  const router = useRouter();
  const [character, setCharacter] = useState(null);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const select = queryParams.get('select');
  //   console.log('Select query parameter:', select);

  //   if (select) {
  //     try {
  //       const decodedSelect = JSON.parse(decodeURIComponent(select));
  //       console.log('Decoded character:', decodedSelect);
  //       setCharacter(decodedSelect);
  //     } catch (error) {
  //       console.error('Failed to decode character data:', error);
  //     }
  //   } else {
  //     console.log('Select query parameter is not available');
  //   }
  // }, []);

  // const handleGiftTastesChange = (newGiftTastesString) => {
  //   // Navigate to the /characters/finalize page and pass the data via query params
  //   router.push(`/characters/finalize?character=${encodeURIComponent(JSON.stringify(character))}&giftTastes=${encodeURIComponent(newGiftTastesString)}`);
  // };

  // if (!character) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Gift Tastes for {character.name}</h1>
        <GiftTastes character={character} onGiftTastesChange={handleGiftTastesChange} />
      </div>
    </div>
  );
};

export default GiftTastesPage;