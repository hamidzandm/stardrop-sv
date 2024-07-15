import React from 'react';
import CharacterCard from '@/components/CharacterCard';
import CharacterSideBarFilter from '@/components/CharacterSideBarFilter';
import { fetchCharacters } from '@/utils/requests';
import Link from 'next/link';


const CharacterPage = async () => {
  const characters = await fetchCharacters();

  characters.sort((a, b) => new Date(b.createdAt - new Date(a.createdAt)));
  return (
    <div className="flex">
      <aside className="w-64 p-4">
        <CharacterSideBarFilter />
      </aside>
      <main className="flex-grow px-4 py-6">
        <div className="container-xl lg:container m-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold ">My Characters</h1>
            <Link href="characters/description"
               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                + New Character
            </Link>
          </div>
          {characters.length === 0 ? (
            <p>No Characters Found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character) => (
                <CharacterCard key={character._id} character={character} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CharacterPage;
