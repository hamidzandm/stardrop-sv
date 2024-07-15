'use client';
import React, { useState, useEffect } from 'react';

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
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Personality</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <p className="mb-4 py-4">
        In this section, you can define the details of your character’s personality. Each of these attributes could affect your character’s dialogues, schedules, and overall behavior.
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Characteristics</h2>
        <p className="text-sm mb-4">Below you can describe the characteristics of your character.</p>
        
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            placeholder="Example: He’s very friendly and caring. He’s very creative in what he does."
            value={editedPersonality.characteristics}
            onChange={(e) => handlePersonalityChange('characteristics', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-2">{personality.characteristics}</p>
        )}
        <label className="block text-sm font-bold">Job:</label>
        {isEditing ? (
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.job}
            onChange={(e) => handlePersonalityChange('job', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.job}</p>
        )}
        <label className="block text-sm font-bold">Hobbies:</label>
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.hobbies}
            onChange={(e) => handlePersonalityChange('hobbies', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.hobbies}</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Favorites</h2>
        <label className="block text-sm font-bold">Food And Drinks:</label>
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Example: He likes tea, beer, photography, fruits, beach, sun, talking with other people."
            value={editedPersonality.foodAndDrinks}
            onChange={(e) => handlePersonalityChange('foodAndDrinks', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.foodAndDrinks}</p>
        )}
        <label className="block text-sm font-bold">Others:</label>
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Example: He doesn’t like coffee, books, farming, cars, blue things."
            value={editedPersonality.others}
            onChange={(e) => handlePersonalityChange('others', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.others}</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Social Behaviors</h2>
        <label className="block text-sm font-bold">Manners:</label>
        {isEditing ? (
          <select
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.manners}
            onChange={(e) => handlePersonalityChange('manners', e.target.value)}
          >
            <option value="Polite">Polite</option>
            <option value="Rude">Rude</option>
            <option value="Neutral">Neutral</option>
          </select>
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.manners}</p>
        )}
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.mannersDescription}
            onChange={(e) => handlePersonalityChange('mannersDescription', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.mannersDescription}</p>
        )}
        <label className="block text-sm font-bold">Social Anxiety:</label>
        {isEditing ? (
          <select
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.socialAnxiety}
            onChange={(e) => handlePersonalityChange('socialAnxiety', e.target.value)}
          >
            <option value="Outgoing">Outgoing</option>
            <option value="Neutral">Neutral</option>
            <option value="Shy">Shy</option>
          </select>
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.socialAnxiety}</p>
        )}
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.socialAnxietyDescription}
            onChange={(e) => handlePersonalityChange('socialAnxietyDescription', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.socialAnxietyDescription}</p>
        )}
        <label className="block text-sm font-bold">Optimism:</label>
        {isEditing ? (
          <select
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.optimism}
            onChange={(e) => handlePersonalityChange('optimism', e.target.value)}
          >
            <option value="Negative">Negative</option>
            <option value="Neutral">Neutral</option>
            <option value="Positive">Positive</option>
          </select>
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.optimism}</p>
        )}
        {isEditing ? (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={editedPersonality.optimismDescription}
            onChange={(e) => handlePersonalityChange('optimismDescription', e.target.value)}
          />
        ) : (
          <p className="w-full p-2 border border-gray-300 rounded-lg mb-4">{personality.optimismDescription}</p>
        )}
      </div>
    </div>
  );
};

export default CharacterPersonality;
