import React from 'react';

const CharacterSummary = ({ select }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 m-4 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Personality</h2>
        <button className="text-xl">?</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <p className="mb-4">∑ {select.summary}</p>
        <p className="mb-2">{select.description}</p>
        <p className="italic">{select.quote}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <ul className="list-disc list-inside space-y-2">
          {select.traits.map((trait, index) => (
            <li key={index}>
              <span className="font-bold">{trait.title}: </span>
              <span>{trait.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterSummary;
