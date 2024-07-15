import React, { useState, useEffect } from 'react';

const CharacterGiftDialogues = ({ giftDialogues = {}, onDialoguesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDialogues, setEditedDialogues] = useState({ ...giftDialogues });

  useEffect(() => {
    setEditedDialogues(giftDialogues);
    console.log('Gift Dialogues Data:', giftDialogues); // Debug log
  }, [giftDialogues]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onDialoguesChange(editedDialogues);
  };

  const handleDialogueChange = (category, value) => {
    setEditedDialogues(prevState => ({
      ...prevState,
      [category]: value
    }));
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Character Gift Dialogues</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto h-64">
        {isEditing ? (
          <ul className="list-disc list-inside space-y-2">
            {Object.keys(editedDialogues).map((category, index) => (
              <li key={index}>
                <h3 className="text-lg font-semibold capitalize">{category}:</h3>
                <textarea
                  value={editedDialogues[category]}
                  onChange={(e) => handleDialogueChange(category, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder={`Dialogue for ${category}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {Object.keys(giftDialogues).map((category, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-semibold capitalize">{category}:</h3>
                <p className="text-black pl-4">
                  {giftDialogues[category]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CharacterGiftDialogues;
