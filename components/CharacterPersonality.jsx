'use client';
import React, { useState, useEffect } from 'react';

const Tooltip = ({ text }) => (
  <div className="relative flex flex-col items-center group">
    <span className="text-blue-500 cursor-pointer ml-1">?</span>
    <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
      <div className="w-64 p-2 text-xs leading-none text-white bg-gray-800 shadow-lg rounded-md z-10">
        {text}
      </div>
      <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-800"></div>
    </div>
  </div>
);

const CharacterPersonality = ({ personality, onPersonalityChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersonality, setEditedPersonality] = useState({ ...personality });

  useEffect(() => {
    setEditedPersonality(personality);
  }, [personality]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onPersonalityChange(editedPersonality);
  };

  const handlePersonalityChange = (field, value) => {
    setEditedPersonality((prevPersonality) => ({
      ...prevPersonality,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Personality</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <p className="mb-4 text-gray-600">
        In this section, you can define the details of your character’s personality. Each of these attributes could affect your character’s dialogues, schedules, and overall behavior.
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Characteristics</h2>
        <p className="text-sm text-gray-500 mb-4">Below you can describe the characteristics of your character.</p>
        
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            placeholder="Example: He’s very friendly and caring. He’s very creative in what he does."
            value={editedPersonality.characteristics}
            onChange={(e) => handlePersonalityChange('characteristics', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-2 bg-gray-50">{personality.characteristics}</p>
        )}
        <label className="block text-sm font-bold text-gray-700">Job:</label>
        {isEditing ? (
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.job}
            onChange={(e) => handlePersonalityChange('job', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.job}</p>
        )}
        <label className="block text-sm font-bold text-gray-700">Hobbies:</label>
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.hobbies}
            onChange={(e) => handlePersonalityChange('hobbies', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.hobbies}</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Favorites</h2>
        <label className="block text-sm font-bold text-gray-700">Food And Drinks:</label>
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Example: He likes tea, beer, photography, fruits, beach, sun, talking with other people."
            value={editedPersonality.foodAndDrinks}
            onChange={(e) => handlePersonalityChange('foodAndDrinks', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.foodAndDrinks}</p>
        )}
        <label className="block text-sm font-bold text-gray-700">Others:</label>
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Example: He doesn’t like coffee, books, farming, cars, blue things."
            value={editedPersonality.others}
            onChange={(e) => handlePersonalityChange('others', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.others}</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Social Behaviors</h2>
        <label className="block text-sm font-bold text-gray-700 flex items-center">
          Manners: 
          <Tooltip text="This attribute determines the level of politeness and respect an NPC shows in their interactions. Higher manners result in more courteous and considerate dialogue, while lower manners can lead to blunt or rude behavior." />
        </label>
        {isEditing ? (
          <>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={editedPersonality.manners}
              onChange={(e) => handlePersonalityChange('manners', e.target.value)}
            >
              <option value="Polite">Polite</option>
              <option value="Rude">Rude</option>
              <option value="Neutral">Neutral</option>
            </select>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={editedPersonality.mannersDescription}
              onChange={(e) => handlePersonalityChange('mannersDescription', e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.manners}</p>
            <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.mannersDescription}</p>
          </>
        )}
        <label className="block text-sm font-bold text-gray-700 flex items-center">
          Social Anxiety: 
          <Tooltip text="This attribute indicates the level of shyness or introversion an NPC experiences. NPCs with high social anxiety may be less likely to initiate conversations, attend events, or interact with other characters. They might also have dialogue that reflects their discomfort in social situations." />
        </label>
        {isEditing ? (
          <>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={editedPersonality.socialAnxiety}
              onChange={(e) => handlePersonalityChange('socialAnxiety', e.target.value)}
            >
              <option value="Outgoing">Outgoing</option>
              <option value="Neutral">Neutral</option>
              <option value="Shy">Shy</option>
            </select>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={editedPersonality.socialAnxietyDescription}
              onChange={(e) => handlePersonalityChange('socialAnxietyDescription', e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.socialAnxiety}</p>
            <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.socialAnxietyDescription}</p>
          </>
        )}
        <label className="block text-sm font-bold text-gray-700 flex items-center">
          Optimism: 
          <Tooltip text="This attribute reflects the NPC's general outlook on life. High optimism leads to positive, upbeat dialogue and a tendency to see the bright side of situations. Low optimism can result in more pessimistic or downbeat responses." />
        </label>
        {isEditing ? (
          <>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={editedPersonality.optimism}
              onChange={(e) => handlePersonalityChange('optimism', e.target.value)}
            >
              <option value="Negative">Negative</option>
              <option value="Neutral">Neutral</option>
              <option value="Positive">Positive</option>
            </select>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={editedPersonality.optimismDescription}
              onChange={(e) => handlePersonalityChange('optimismDescription', e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.optimism}</p>
            <p className="w-full p-2 border border-gray-300 rounded-lg mb-4 bg-gray-50">{personality.optimismDescription}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterPersonality;
