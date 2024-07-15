'use client'
import React, { useState } from 'react';
import CharacterSelect from '@/components/CharacterSelect';
import CharacterSchedule from '@/components/CharacterSchedule';
import CharacterDialogue from '@/components/CharacterDialogue';
// import CharacterSummary from '@/components/CharacterSummary';
import CharacterPersonality from '@/components/CharacterPersonality';
import { useSearchParams } from 'next/navigation';




// const sampleCharacter = {
//   portraits: ['portrait1.png'],
//   name: 'Larry',
//   gender: 'Male',
//   age: 44,
//   birthday: 'Fall, 15',
//   title: 'A Photographer Seeking a Fresh Start',
//   highlights: [
//     'Gentle and kind',
//     'Creative and artistic',
//     'Reserved but friendly',
//     'Tea enthusiast',
//   ],
//   quote: 'I’ve traveled far and wide, but Stardew Valley feels like home.',
//   summary: "He’s passionate about photography and tea. He loves discussing and sharing different tea blends.",
//   description: "He usually walks around the farm in the morning, capturing the morning light. “The light here is just perfect for capturing the start of a new day.” In the evening, he relaxes at Stardrop Saloon, shares stories.",
//   traits: [
//     { title: 'Tea Enthusiast', description: 'A good cup of tea can be as invigorating as it is calming.' },
//     { title: 'Beer Expert', description: 'There’s a certain camaraderie that comes with sharing a cold beer at the end of the day.' },
//     { title: 'Reflective & Introspective', description: 'Finds beauty in simplicity, often lost in thought.' },
//     { title: 'Gentle & Kind', description: 'Always willing to help and share his wisdom.' },
//     { title: 'Creative & Artistic', description: 'Passionate about photography, seeing the world.' },
//   ],
//   dialogues: [
//     "I used to be a city photographer, you know. But this place... There's a different kind of beauty here.",
//     "The sound of the waves is so calming, isn't it? Makes you want to sip on a cup of calming chamomile tea and just watch the world go by.",
//     "This place has a certain...energy. It would be fascinating to capture it on camera.",
//     "A good cup of tea can be as invigorating as it is calming.",
//     "There's a certain camaraderie that comes with sharing a cold beer at the end of the day.",
//   ],
//  schedules: [
//   {
//     title: "Morning Walks and Photography",
//     time: "6:00 AM - 8:00 AM",
//     description: "Larry's routine of walking around the farm to capture the morning light showcases his reflective and artistic nature, as he finds beauty in simplicity and starts his day with creativity."
//   },
//   {
//     title: "Evenings at Stardrop Saloon",
//     time: "6:30 PM - 10:00 PM",
//     description: "Larry's habit of sitting in a corner at Stardrop Saloon to relax and avoid people in the evening underscores his withdrawn and curt personality, as well as his enjoyment of a good beer as a way to unwind."
//   },
//   {
//     title: "Forest Photography Trips",
//     time: "10:00 AM - 12:00 PM (Saturday)",
//     description: "Larry's trips to the forest for new photo opportunities illustrate his creative and artistic side, as well as his love for solitude and nature. This activity allows him to immerse himself in his passion for photography while enjoying the tranquility of the natural environment."
//   }
// ]
// };

// const scheduleData = [
//   {
//     title: "Morning Walks and Photography",
//     time: "6:00 AM - 8:00 AM",
//     description: "Larry's routine of walking around the farm to capture the morning light showcases his reflective and artistic nature, as he finds beauty in simplicity and starts his day with creativity."
//   },
//   {
//     title: "Evenings at Stardrop Saloon",
//     time: "6:30 PM - 10:00 PM",
//     description: "Larry's habit of sitting in a corner at Stardrop Saloon to relax and avoid people in the evening underscores his withdrawn and curt personality, as well as his enjoyment of a good beer as a way to unwind."
//   },
//   {
//     title: "Forest Photography Trips",
//     time: "10:00 AM - 12:00 PM (Saturday)",
//     description: "Larry's trips to the forest for new photo opportunities illustrate his creative and artistic side, as well as his love for solitude and nature. This activity allows him to immerse himself in his passion for photography while enjoying the tranquility of the natural environment."
//   }
// ];

const CharacterSelectPage = () => {
  const searchParams = useSearchParams();
  const selectQuery = searchParams.get('select');
  const initialSelect = selectQuery ? JSON.parse(decodeURIComponent(selectQuery)) : null;

  const [select, setSelect] = useState(initialSelect);

  const handleDialoguesChange = (newDialogues) => {
    setSelect((prevSelect) => ({
      ...prevSelect,
      dialogues: newDialogues,
    }));
  };

  const handleGiftDialoguesChange = (newGiftDialogues) => {
    setSelect((prevSelect) => ({
      ...prevSelect,
      giftDialogues: newGiftDialogues,
    }));
  };

  const handleSchedulesChange = (newSchedules) => {
    setSelect((prevSelect) => ({
      ...prevSelect,
      schedules: newSchedules,
    }));
  };

  const handleSelectChange = (updatedSelect) => {
    setSelect(updatedSelect);
  };


  const handlePersonalityChange = (updatedPersonality) => {
    setSelect((prevSelect) => ({
      ...prevSelect,
      personality: updatedPersonality
    }));
  };


  // const sampleCharacterPersonality = {
  //   characteristics: "He’s very friendly and caring. He’s very creative in what he does.",
  //   job: "Photographer",
  //   hobbies: "Tea and beer enthusiast, testing different blends of these drinks. Also, he loves to photograph.",
  //   likes: "He likes tea, beer, photography, fruits, beach, sun, talking with other people.",
  //   dislikes: "He doesn’t like coffee, books, farming, cars, blue things.",
  //   manners: "Polite",
  //   mannersDescription: "He always says please and thank you.",
  //   socialAnxiety: "Neutral",
  //   socialAnxietyDescription: "He feels comfortable in most social situations but prefers smaller gatherings.",
  //   optimism: "Positive",
  //   optimismDescription: "He always looks on the bright side of life.",
  // };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-200 p-4 space-x-4">
      {select ? (
        <CharacterSelect select={select} onSelectChange={handleSelectChange}>
          <div className="space-y-4">
            {/* <CharacterSummary select={select} /> */}
            <CharacterPersonality personality={select.personality} onPersonalityChange={handlePersonalityChange} />
            <CharacterDialogue dialogues={select.dialogues} onDialoguesChange={handleDialoguesChange} />
            <CharacterSchedule schedules={select.schedules} onSchedulesChange={handleSchedulesChange} />
          </div>
        </CharacterSelect>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CharacterSelectPage;