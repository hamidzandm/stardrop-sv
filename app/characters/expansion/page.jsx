import React from 'react';
import CharacterExpansion from '@/components/CharacterExpansion';

const sampleCharacter = {
  portraits: ['portrait1.png'],
  name: 'Larry',
  age: 44,
  profession: 'Photographer',
  description: 'He’s passionate about photography and tea. He loves discussing and sharing different tea blends. He usually walks around the farm in the morning, capturing the morning light. In the evening, he relaxes at Stardrop Saloon, shares stories.',
  quote: 'The light here is just perfect for capturing the start of a new day.',
  traits: [
    { title: 'Tea Enthusiast', description: 'A good cup of tea can be as invigorating as it is calming.' },
    { title: 'Beer Expert', description: 'There’s a certain camaraderie that comes with sharing a cold beer at the end of the day.' },
    { title: 'Reflective & Introspective', description: 'Finds beauty in simplicity, often lost in thought.' },
    { title: 'Gentle & Kind', description: 'Always willing to help and share his wisdom.' },
    { title: 'Creative & Artistic', description: 'Passionate about photography, seeing the world.' },
  ],
};

const CharacterExpansionPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <CharacterExpansion character={sampleCharacter} />
    </div>
  );
};

export default CharacterExpansionPage;
