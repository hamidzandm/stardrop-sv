'use client'
import React, { useState, useEffect } from 'react';


import { useRouter } from 'next/navigation';

const CharacterSelect = ({ select, children, onSelectChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSelect, setEditedSelect] = useState({ ...select });
  const router = useRouter();

  useEffect(() => {
    setEditedSelect(select);
  }, [select]);


  const handleExportJSON = () => {
    const dataStr = JSON.stringify(editedSelect, null, 2); // Pretty-print JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'character.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleProceed = () => {
    // handleExportJSON();
    const encodedSelect = encodeURIComponent(JSON.stringify(editedSelect));
    router.push(`/characters/finalize?character=${encodedSelect}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSelectChange(editedSelect);
  };

  const handleChange = (field, value) => {
    setEditedSelect((prevSelect) => ({
      ...prevSelect,
      [field]: value,
    }));
  };

  if (!select) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full flex flex-col max-w-6xl">
      <div className="flex flex-grow">
        {/* Left Section with Character Details */}
        <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
          <div className="text-center mb-4">
            <div className="w-24 h-24 mb-2 mx-auto">
              <img src={'/images/characters/2_portrait.png'} alt={select.name} className="rounded-full" />
            </div>
            <button className="text-xl" onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={editedSelect.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <input
                type="text"
                value={select.name}
                className="w-full p-2 border border-gray-300 rounded-lg"
                readOnly
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Gender:</label>
            {isEditing ? (
              <select
                value={editedSelect.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <select value={select.gender} className="w-full p-2 border border-gray-300 rounded-lg" readOnly>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Age:</label>
            {isEditing ? (
              <input
                type="number"
                value={editedSelect.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <input
                type="number"
                value={select.age}
                className="w-full p-2 border border-gray-300 rounded-lg"
                readOnly
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Birthday:</label>
            {isEditing ? (
              <input
                type="text"
                value={editedSelect.birthday}
                onChange={(e) => handleChange('birthday', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <input
                type="text"
                value={select.birthday}
                className="w-full p-2 border border-gray-300 rounded-lg"
                readOnly
              />
            )}
          </div>
          <div className="text-sm">
            <h3 className="font-bold mb-2">{select.title}</h3>
            <ul className="list-disc list-inside mb-4">
              {select.highlights && Array.isArray(select.highlights) && select.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            <p className="italic">“{select.description}”</p>
          </div>
        </div>

        {/* Right Section for Children Components */}
        <div className="w-2/3 bg-gray-200 rounded-lg shadow-md p-4 ml-4 overflow-y-auto h-[calc(100vh-8rem)]">
          {children}
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="flex justify-between items-center mt-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Back</button>
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Edit your prompt: Larry is a photograph..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Generate</button>
        <button onClick={handleProceed} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg ml-2">Proceed</button>
      </div>
    </div>
  );
};

export default CharacterSelect;