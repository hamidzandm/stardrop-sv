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
    <div className="mb-4 bg-white rounded-lg shadow-lg p-6">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          {Object.keys(formattedDialogues).length === 0 ? (
            <p className="text-gray-500">Wait for dialogues...</p>
          ) : (
            <div>
              {Object.entries(formattedDialogues).map(([location, locationDialogues], index) => (
                <div key={index} className="mb-8">
                  <h3 className="font-bold text-xl mb-4 text-blue-600">{formatLocationName(location)}</h3>
                  <div className="space-y-2">
                    {locationDialogues.map((dialogue, idx) => (
                      <p key={idx} className="italic text-gray-700 pl-4 border-l-4 border-blue-200">"{dialogue}"</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterDialoguesTable;
