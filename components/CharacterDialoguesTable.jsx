import React from 'react';
import Spinner from './Spinner'; // Adjust the path according to your project structure

const CharacterDialoguesTable = ({ dialogues = [], loading }) => {
  const formatDialogues = (dialogues) => {
    const formattedDialogues = {};
    dialogues.forEach(({ event, text }) => {
      const location = event.split('_')[0]; // Get the location part before the first underscore
      if (!formattedDialogues[location]) {
        formattedDialogues[location] = [];
      }
      formattedDialogues[location].push(text);
    });
    return formattedDialogues;
  };

  const formatLocationName = (location) => {
    return location.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase());
  };

  const formattedDialogues = formatDialogues(dialogues);

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
      <h2 className="text-xl font-bold mb-2">Dialogues</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-y-auto max-h-96 bg-gray-200 rounded-lg p-4">
          {Object.keys(formattedDialogues).length === 0 ? (
            <p>Wait for dialogues...</p>
          ) : (
            <ul className="list-disc list-inside pl-4">
              {Object.entries(formattedDialogues).map(([location, locationDialogues], index) => (
                <li key={index} className="mb-4">
                  <h3 className="font-bold text-lg mb-2">{formatLocationName(location)}</h3>
                  {locationDialogues.map((dialogue, idx) => (
                    <p key={idx} className="italic text-gray-700 ml-4">"{dialogue}"</p>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterDialoguesTable;
