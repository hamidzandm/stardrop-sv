import React from 'react';
import Spinner from './Spinner'; // Adjust the path according to your project structure

const dayMapping = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday'
};

const CharacterDialoguesTable = ({ dialogues = [], loading }) => {
  const formatDialogues = (dialogues) => {
    const formattedDialogues = {};
    dialogues.forEach(({ event, text }) => {
      const [location] = event.split('_'); // Get the location part before the first underscore
      if (!formattedDialogues[location]) {
        formattedDialogues[location] = [];
      }
      formattedDialogues[location].push({ event, text });
    });
    return formattedDialogues;
  };

  const formatLocationName = (location) => {
    return location.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase());
  };

  const getOrdinalSuffix = (number) => {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) {
      return `${number}st`;
    }
    if (j === 2 && k !== 12) {
      return `${number}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${number}rd`;
    }
    return `${number}th`;
  };

  const formatEventName = (event) => {
    const parts = event.split('_');
    const day = parseInt(parts[0], 10);
    if (!isNaN(day)) {
      return `${getOrdinalSuffix(day)} Day of the Month`;
    }
    return dayMapping[event] || event;
  };

  const isDayEvent = (event) => {
    const parts = event.split('_');
    const day = parseInt(parts[0], 10);
    return !isNaN(day);
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
                  <h3 className="font-bold text-xl mb-4 text-blue-600">
                    {isDayEvent(location) ? formatEventName(location) : formatLocationName(location)}
                  </h3>
                  <div className="space-y-2">
                    {locationDialogues.map((dialogue, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="italic text-gray-700 pl-4 border-l-4 border-blue-200">"{dialogue.text}"</p>
                      </div>
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
