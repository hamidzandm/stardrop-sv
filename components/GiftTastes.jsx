import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import items from '@/items'; // Adjust the path to your items file

const GiftTastes = ({ initialData, onDone, characterName, preferences }) => {
  const [giftTastes, setGiftTastes] = useState(initialData);

  useEffect(() => {
    if (preferences) {
      const transformedPreferences = {
        love: preferences.love.flatMap(pref => pref.key.nearestItems),
        like: preferences.like.flatMap(pref => pref.key.nearestItems),
        dislike: preferences.dislike.flatMap(pref => pref.key.nearestItems),
        hate: preferences.hate.flatMap(pref => pref.key.nearestItems),
        neutral: preferences.neutral.flatMap(pref => pref.key.nearestItems),
      };
      setGiftTastes(transformedPreferences);
    }
  }, [preferences]);

  const handleChange = (category, selectedOptions) => {
    setGiftTastes(prev => ({
      ...prev,
      [category]: selectedOptions || []
    }));
  };

  const handleDone = () => {
    onDone(giftTastes);
  };

  // Convert items object to an array of options
  const formatOptions = Object.entries(items).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
      <h2 className="text-xl font-bold mb-2">Gift Tastes for {characterName}</h2>
      {['love', 'like', 'dislike', 'hate', 'neutral'].map(category => (
        <div key={category} className="mb-4">
          <h3 className="font-bold capitalize">{category}</h3>
          <Select
            isMulti
            value={giftTastes[category].map(item => ({
              value: item,
              label: item,
            }))}
            onChange={selectedOptions => handleChange(category, selectedOptions.map(option => option.label))}
            options={formatOptions}
          />
        </div>
      ))}
      <div className="text-right">
        <button onClick={handleDone} className="bg-green-300 hover:bg-green-400 text-black px-4 py-2 rounded-lg">Done</button>
      </div>
    </div>
  );
};

export default GiftTastes;
