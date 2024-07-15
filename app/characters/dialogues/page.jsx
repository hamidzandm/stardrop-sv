import React from 'react';
import CharacterDialogues from '@/components/CharacterDialogues';

const sampleDialogues = {
  'Special dialogues': [
    "I used to be a city photographer, you know. But this place... There's a different kind of beauty here.",
  ],
  'Location dialogues': [
    'Ah, the Stardrop. Always a familiar sight after a long day.',
    'Hey there! Mind if I join you? Love sharing stories over a drink.',
    "The sound of the waves is so calming, isn't it? Makes you want to sip on a cup of calming chamomile tea and just watch the world go by.",
    'This place has a certain...energy. It would be fascinating to capture it on camera.',
  ],
  'Generic dialogues': [
    "I'm always up for a chat!",
    'Have you tried the new tea blend at the saloon? It’s fantastic.',
  ],
  'Rain dialogues': [
    'Rainy days are perfect for staying indoors and editing photos.',
  ],
};

const CharacterDialoguesPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <CharacterDialogues dialogues={sampleDialogues} />
    </div>
  );
};

export default CharacterDialoguesPage;
