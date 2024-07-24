import React, { useState, useEffect } from 'react';

const CharacterDialogue = ({ dialogues, onDialoguesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDialogues, setEditedDialogues] = useState([...dialogues]);

  useEffect(() => {
    setEditedDialogues(dialogues);
  }, [dialogues]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onDialoguesChange(editedDialogues);
  };

  const handleDialogueChange = (index, value) => {
    const newDialogues = [...editedDialogues];
    newDialogues[index] = value;
    setEditedDialogues(newDialogues);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dialogues</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto h-64">
        {isEditing ? (
          <div className="space-y-2">
            {editedDialogues.map((dialogue, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={dialogue}
                  onChange={(e) => handleDialogueChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {dialogues.map((dialogue, index) => (
              <div key={index} className="italic">"{dialogue}"</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDialogue;
