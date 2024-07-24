'use client'
import React, { useState } from 'react';
import CharacterSelect from '@/components/CharacterSelect';
import CharacterSchedule from '@/components/CharacterSchedule';
import CharacterDialogue from '@/components/CharacterDialogue';
import CharacterPersonality from '@/components/CharacterPersonality';
import { useSearchParams } from 'next/navigation';


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