'use client'
import React, { useState } from 'react';

const CharacterDialogues = ({ dialogues }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Dialogues</h2>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto h-64">
        {Object.keys(dialogues).map((event) => (
          <div key={event}>
            <button
              className="flex items-center justify-between w-full text-left text-lg font-semibold mb-2"
              onClick={() => toggleSection(event)}
            >
              {expandedSections[event] ? '▼' : '▶'} {event}
            </button>
            {expandedSections[event] && (
              <ul className="list-disc list-inside pl-4">
                {Array.isArray(dialogues[event]) && dialogues[event].map((dialogue, index) => (
                  <li key={index} className="mb-2">
                    <span className="inline-block mr-2">🕒</span>
                    <span className="italic">"{dialogue}"</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDialogues;
